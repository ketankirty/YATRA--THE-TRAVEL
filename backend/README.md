# Yatra Travel Backend API

A comprehensive Express.js backend API for the Yatra travel website with MongoDB database integration.

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - User registration and login
  - Password hashing with bcrypt
  - Role-based access control (user/admin)

- **User Management**
  - User profiles with detailed information
  - Password change functionality
  - Account activation/deactivation

- **Booking System**
  - Create and manage travel bookings
  - Booking status tracking
  - Payment status management
  - Booking reference generation

- **Contact Management**
  - Contact form submissions
  - Admin response system
  - Priority-based categorization
  - Status tracking

- **Feedback & Reviews**
  - User reviews and ratings
  - Guest review support
  - Review moderation system
  - Helpful votes and reporting

- **Security Features**
  - Rate limiting
  - CORS protection
  - Helmet security headers
  - Input validation and sanitization

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/yatra-travel
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. Start MongoDB service on your system

5. Run the server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /me` - Get current user profile
- `PUT /profile` - Update user profile
- `PUT /change-password` - Change password
- `POST /logout` - Logout user

### Booking Routes (`/api/bookings`)
- `POST /` - Create new booking
- `GET /` - Get user's bookings
- `GET /:id` - Get single booking
- `PUT /:id` - Update booking
- `DELETE /:id` - Cancel booking
- `GET /admin/all` - Get all bookings (Admin)

### Contact Routes (`/api/contact`)
- `POST /` - Submit contact form
- `GET /` - Get all contacts (Admin)
- `GET /:id` - Get single contact (Admin)
- `PUT /:id/status` - Update contact status (Admin)
- `POST /:id/respond` - Respond to contact (Admin)
- `DELETE /:id` - Delete contact (Admin)

### Feedback Routes (`/api/feedback`)
- `POST /` - Submit feedback/review
- `GET /` - Get published reviews
- `GET /user` - Get user's feedback
- `PUT /:id/helpful` - Mark review as helpful
- `POST /:id/report` - Report inappropriate review
- `GET /admin/all` - Get all feedback (Admin)
- `PUT /:id/moderate` - Moderate feedback (Admin)

## Database Schema

### User Collection
- Personal information (name, email, phone)
- Authentication data (password hash)
- Address and preferences
- Role and account status

### Booking Collection
- User reference
- Destination details
- Travel dates and guest information
- Pricing breakdown
- Contact information
- Status tracking

### Contact Collection
- Contact form data
- Priority and status
- Admin response system
- Tracking information

### Feedback Collection
- User/guest information
- Ratings and reviews
- Moderation system
- Helpful votes and reports

## Security Considerations

- Passwords are hashed using bcrypt with salt rounds of 12
- JWT tokens expire after 7 days (configurable)
- Rate limiting prevents abuse
- Input validation prevents injection attacks
- CORS configured for specific origins
- Sensitive data excluded from API responses

## Development

The API includes comprehensive error handling, logging, and validation. All routes are properly documented and include appropriate HTTP status codes.

For development, use `npm run dev` to start the server with nodemon for automatic restarts on file changes.

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong JWT secret
3. Configure MongoDB connection string
4. Set up proper CORS origins
5. Enable HTTPS
6. Set up monitoring and logging