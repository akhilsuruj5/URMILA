const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  },
  linkedIn: {
    type: String,
    trim: true,
    default: '',
  },
  portfolio: {
    type: String,
    trim: true,
    default: '',
  },
  resumeLink: {
    type: String,
    trim: true,
    default: '',
  },
  coverLetter: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Pending', 'Shortlisted', 'Rejected', 'Accepted'],
    default: 'Pending',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Application', ApplicationSchema);
