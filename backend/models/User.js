const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  phone: {
    type: String,
    match: [
      /^[0-9]{10}$/,
      'Mobile number must be a valid 10-digit number',
    ],
    required: true,  // Now optional for first step
  },
  occupation: {
    type: String,
    enum: ['Student', 'Professional'],
    required: true,  // Now optional for first step
  },
  institution: {
    type: String,
    required: true,  // Now optional for first step
  },
  password: {
    type: String,
    required: true,  // Now optional for first step
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  otp: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
