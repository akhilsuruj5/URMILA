const mongoose = require('mongoose');

// Create a User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Ensures no duplicate email addresses
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [
      /^[0-9]{10}$/, // Validates mobile number to be a 10-digit number
      'Mobile number must be a valid 10-digit number',
    ],
  },
  currentOccupation: {
    type: String,
    required: [true, 'Current occupation is required'],
    enum: ['Student', 'Professional'], // Dropdown options
  },
  instituteOrOrganizationName: {
    type: String,
    required: [true, 'Institute or Organization name is required'],
  },
  password: {
    type: String,
    required: true,
  },
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
