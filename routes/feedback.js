const express = require('express');
const Feedback = require('../models/Feedback');
const { protect, admin, optionalAuth } = require('../middleware/auth');
const { validateFeedback } = require('../middleware/validation');

const router = express.Router();

// @route   POST /api/feedback
// @desc    Submit feedback/review
// @access  Private (can be made public for guest reviews)
router.post('/', optionalAuth, validateFeedback, async (req, res) => {
  try {
    const {
      destination,
      booking,
      ratings,
      review,
      recommendations,
      travelType,
      travelDate,
      guestInfo
    } = req.body;

    const feedbackData = {
      destination,
      booking,
      ratings,
      review,
      recommendations,
      travelType,
      travelDate
    };

    // If user is authenticated, link to user account
    if (req.user) {
      feedbackData.user = req.user.id;
      feedbackData.isVerified = true; // Verified users get auto-verification
    } else {
      // For guest reviews
      if (!guestInfo || !guestInfo.name || !guestInfo.email) {
        return res.status(400).json({
          success: false,
          message: 'Guest information (name and email) is required for anonymous reviews'
        });
      }
      feedbackData.guestInfo = guestInfo;
    }

    const feedback = await Feedback.create(feedbackData);

    await feedback.populate([
      { path: 'user', select: 'name email' },
      { path: 'booking', select: 'bookingReference destination' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback! It will be reviewed before publishing.',
      feedback
    });
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error submitting feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   GET /api/feedback
// @desc    Get published feedback/reviews
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = { 
      isPublished: true,
      moderationStatus: 'approved'
    };
    
    // Filter by destination
    if (req.query.destination) {
      query['destination.id'] = req.query.destination;
    }

    // Filter by rating
    if (req.query.minRating) {
      query['ratings.overall'] = { $gte: parseInt(req.query.minRating) };
    }

    // Sort options
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (req.query.sort === 'rating') {
      sortOption = { 'ratings.overall': -1 };
    } else if (req.query.sort === 'helpful') {
      sortOption = { helpfulVotes: -1 };
    }

    const feedback = await Feedback.find(query)
      .populate('user', 'name')
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .select('-moderationNotes -reportCount');

    const total = await Feedback.countDocuments(query);

    // Get average ratings for the destination
    let averageRatings = null;
    if (req.query.destination) {
      const ratingStats = await Feedback.aggregate([
        {
          $match: {
            'destination.id': req.query.destination,
            isPublished: true,
            moderationStatus: 'approved'
          }
        },
        {
          $group: {
            _id: null,
            avgOverall: { $avg: '$ratings.overall' },
            avgAccommodation: { $avg: '$ratings.accommodation' },
            avgTransportation: { $avg: '$ratings.transportation' },
            avgGuide: { $avg: '$ratings.guide' },
            avgValueForMoney: { $avg: '$ratings.valueForMoney' },
            totalReviews: { $sum: 1 }
          }
        }
      ]);

      if (ratingStats.length > 0) {
        averageRatings = ratingStats[0];
      }
    }

    res.json({
      success: true,
      feedback,
      averageRatings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting feedback'
    });
  }
});

// @route   GET /api/feedback/user
// @desc    Get user's feedback
// @access  Private
router.get('/user', protect, async (req, res) => {
  try {
    const feedback = await Feedback.find({ user: req.user.id })
      .populate('booking', 'bookingReference destination')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      feedback
    });
  } catch (error) {
    console.error('Get user feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting user feedback'
    });
  }
});

// @route   PUT /api/feedback/:id/helpful
// @desc    Mark feedback as helpful
// @access  Public
router.put('/:id/helpful', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { $inc: { helpfulVotes: 1 } },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.json({
      success: true,
      message: 'Thank you for your vote!',
      helpfulVotes: feedback.helpfulVotes
    });
  } catch (error) {
    console.error('Mark helpful error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error marking feedback as helpful'
    });
  }
});

// @route   POST /api/feedback/:id/report
// @desc    Report inappropriate feedback
// @access  Public
router.post('/:id/report', async (req, res) => {
  try {
    const { reason } = req.body;

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { $inc: { reportCount: 1 } },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    // If report count exceeds threshold, unpublish automatically
    if (feedback.reportCount >= 5) {
      feedback.isPublished = false;
      feedback.moderationStatus = 'pending';
      await feedback.save();
    }

    res.json({
      success: true,
      message: 'Thank you for reporting. We will review this feedback.'
    });
  } catch (error) {
    console.error('Report feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error reporting feedback'
    });
  }
});

// @route   GET /api/feedback/admin/all
// @desc    Get all feedback for moderation (Admin only)
// @access  Private/Admin
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const query = {};
    
    // Filter options
    if (req.query.status) query.moderationStatus = req.query.status;
    if (req.query.published !== undefined) query.isPublished = req.query.published === 'true';
    if (req.query.destination) query['destination.name'] = new RegExp(req.query.destination, 'i');

    const feedback = await Feedback.find(query)
      .populate('user', 'name email')
      .populate('booking', 'bookingReference')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Feedback.countDocuments(query);

    // Get moderation statistics
    const stats = await Feedback.aggregate([
      {
        $group: {
          _id: '$moderationStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      feedback,
      stats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get all feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting feedback'
    });
  }
});

// @route   PUT /api/feedback/:id/moderate
// @desc    Moderate feedback (Admin only)
// @access  Private/Admin
router.put('/:id/moderate', protect, admin, async (req, res) => {
  try {
    const { moderationStatus, isPublished, moderationNotes } = req.body;

    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(moderationStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid moderation status'
      });
    }

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        moderationStatus,
        isPublished: moderationStatus === 'approved' ? isPublished : false,
        moderationNotes
      },
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.json({
      success: true,
      message: 'Feedback moderated successfully',
      feedback
    });
  } catch (error) {
    console.error('Moderate feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error moderating feedback'
    });
  }
});

module.exports = router;