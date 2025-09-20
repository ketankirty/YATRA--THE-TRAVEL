const { body, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User registration validation
const validateRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  handleValidationErrors
];

// User login validation
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// Booking validation
const validateBooking = [
  body('destination.id')
    .notEmpty()
    .withMessage('Destination ID is required'),
  
  body('destination.name')
    .notEmpty()
    .withMessage('Destination name is required'),
  
  body('travelDates.startDate')
    .isISO8601()
    .withMessage('Valid start date is required')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Start date must be in the future');
      }
      return true;
    }),
  
  body('travelDates.endDate')
    .isISO8601()
    .withMessage('Valid end date is required')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.travelDates.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  body('guests.adults')
    .isInt({ min: 1, max: 20 })
    .withMessage('Number of adults must be between 1 and 20'),
  
  body('guests.children')
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage('Number of children must be between 0 and 10'),
  
  body('contactInfo.phone')
    .matches(/^\+?[\d\s-()]+$/)
    .withMessage('Please provide a valid phone number'),
  
  handleValidationErrors
];

// Contact form validation
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('subject')
    .isIn(['general', 'booking', 'support', 'feedback', 'partnership', 'complaint', 'other'])
    .withMessage('Please select a valid subject'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  
  body('phone')
    .optional()
    .matches(/^\+?[\d\s-()]+$/)
    .withMessage('Please provide a valid phone number'),
  
  handleValidationErrors
];

// Feedback validation
const validateFeedback = [
  body('ratings.overall')
    .isInt({ min: 1, max: 5 })
    .withMessage('Overall rating must be between 1 and 5'),
  
  body('review.description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Review description must be between 10 and 2000 characters'),
  
  body('travelType')
    .isIn(['solo', 'couple', 'family', 'friends', 'business'])
    .withMessage('Please select a valid travel type'),
  
  body('travelDate')
    .isISO8601()
    .withMessage('Valid travel date is required'),
  
  body('recommendations.wouldRecommend')
    .isBoolean()
    .withMessage('Recommendation field is required'),
  
  handleValidationErrors
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateBooking,
  validateContact,
  validateFeedback,
  handleValidationErrors
};