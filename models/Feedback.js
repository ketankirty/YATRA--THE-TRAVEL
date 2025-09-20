const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // For anonymous feedback
  guestInfo: {
    name: String,
    email: String
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  destination: {
    id: String,
    name: String
  },
  ratings: {
    overall: {
      type: Number,
      required: [true, 'Overall rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    accommodation: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    transportation: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    guide: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    valueForMoney: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    }
  },
  review: {
    title: {
      type: String,
      maxlength: [100, 'Review title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Review description is required'],
      maxlength: [2000, 'Review cannot exceed 2000 characters']
    },
    pros: [String],
    cons: [String]
  },
  recommendations: {
    wouldRecommend: {
      type: Boolean,
      required: true
    },
    recommendationReason: String
  },
  travelType: {
    type: String,
    enum: ['solo', 'couple', 'family', 'friends', 'business'],
    required: true
  },
  travelDate: {
    type: Date,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  moderationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  moderationNotes: String,
  helpfulVotes: {
    type: Number,
    default: 0
  },
  reportCount: {
    type: Number,
    default: 0
  },
  photos: [{
    url: String,
    caption: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Indexes for efficient querying
feedbackSchema.index({ 'destination.id': 1, isPublished: 1 });
feedbackSchema.index({ 'ratings.overall': -1 });
feedbackSchema.index({ createdAt: -1 });

// Calculate average rating before saving
feedbackSchema.pre('save', function(next) {
  const ratings = this.ratings;
  const ratingValues = [
    ratings.accommodation,
    ratings.transportation,
    ratings.guide,
    ratings.valueForMoney
  ].filter(rating => rating !== undefined && rating !== null);
  
  if (ratingValues.length > 0) {
    const average = ratingValues.reduce((sum, rating) => sum + rating, 0) / ratingValues.length;
    // Update overall rating if not manually set
    if (!this.isModified('ratings.overall')) {
      this.ratings.overall = Math.round(average * 10) / 10; // Round to 1 decimal place
    }
  }
  
  next();
});

module.exports = mongoose.model('Feedback', feedbackSchema);