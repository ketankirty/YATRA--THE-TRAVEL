const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    enum: [
      'general',
      'booking',
      'support',
      'feedback',
      'partnership',
      'complaint',
      'other'
    ]
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved', 'closed'],
    default: 'new'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  response: {
    message: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  },
  source: {
    type: String,
    enum: ['website', 'email', 'phone', 'social-media'],
    default: 'website'
  },
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

// Index for efficient querying
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });

module.exports = mongoose.model('Contact', contactSchema);