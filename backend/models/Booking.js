const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    id: {
      type: String,
      required: [true, 'Destination ID is required']
    },
    name: {
      type: String,
      required: [true, 'Destination name is required']
    },
    region: String,
    price: {
      type: Number,
      required: [true, 'Price is required']
    }
  },
  travelDates: {
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required']
    }
  },
  guests: {
    adults: {
      type: Number,
      required: [true, 'Number of adults is required'],
      min: [1, 'At least 1 adult is required']
    },
    children: {
      type: Number,
      default: 0,
      min: [0, 'Children count cannot be negative']
    }
  },
  totalGuests: {
    type: Number,
    required: true
  },
  pricing: {
    basePrice: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    taxes: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true
    }
  },
  contactInfo: {
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    },
    alternatePhone: String,
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    }
  },
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests cannot exceed 500 characters']
  },
  accommodationPreference: {
    type: String,
    enum: ['standard', 'deluxe', 'luxury'],
    default: 'standard'
  },
  mealPreference: {
    type: String,
    enum: ['vegetarian', 'non-vegetarian', 'vegan', 'jain'],
    default: 'vegetarian'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentDetails: {
    transactionId: String,
    paymentMethod: String,
    paidAmount: Number,
    paymentDate: Date
  },
  bookingReference: {
    type: String,
    unique: true
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  }
}, {
  timestamps: true
});

// Generate booking reference before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingReference) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    this.bookingReference = `YTR-${timestamp}-${random}`.toUpperCase();
  }
  next();
});

// Calculate total guests
bookingSchema.pre('save', function(next) {
  this.totalGuests = this.guests.adults + this.guests.children;
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);