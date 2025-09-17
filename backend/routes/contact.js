const express = require('express');
const Contact = require('../models/Contact');
const { protect, admin, optionalAuth } = require('../middleware/auth');
const { validateContact } = require('../middleware/validation');

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', optionalAuth, validateContact, async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Get client IP and user agent for tracking
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      ipAddress,
      userAgent,
      // Set priority based on subject
      priority: subject === 'complaint' || subject === 'support' ? 'high' : 'medium'
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
      contactId: contact._id
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error submitting contact form',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages (Admin only)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const query = {};
    
    // Filter options
    if (req.query.status) query.status = req.query.status;
    if (req.query.subject) query.subject = req.query.subject;
    if (req.query.priority) query.priority = req.query.priority;
    if (req.query.search) {
      query.$or = [
        { name: new RegExp(req.query.search, 'i') },
        { email: new RegExp(req.query.search, 'i') },
        { message: new RegExp(req.query.search, 'i') }
      ];
    }

    const contacts = await Contact.find(query)
      .populate('assignedTo', 'name email')
      .populate('response.respondedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments(query);

    // Get contact statistics
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      contacts,
      stats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting contacts'
    });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact message
// @access  Private/Admin
router.get('/:id', protect, admin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('response.respondedBy', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting contact'
    });
  }
});

// @route   PUT /api/contact/:id/status
// @desc    Update contact status
// @access  Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status, assignedTo } = req.body;

    const validStatuses = ['new', 'in-progress', 'resolved', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const updateData = { status };
    if (assignedTo) updateData.assignedTo = assignedTo;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      contact
    });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating contact status'
    });
  }
});

// @route   POST /api/contact/:id/respond
// @desc    Respond to contact message
// @access  Private/Admin
router.post('/:id/respond', protect, admin, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Response message is required'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        response: {
          message: message.trim(),
          respondedBy: req.user.id,
          respondedAt: new Date()
        },
        status: 'resolved'
      },
      { new: true, runValidators: true }
    ).populate('response.respondedBy', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      message: 'Response sent successfully',
      contact
    });
  } catch (error) {
    console.error('Respond to contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error sending response'
    });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact message
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting contact'
    });
  }
});

module.exports = router;