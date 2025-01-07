const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
    required: true,
    trim: true,
  },
  coverLetter: {
    type: String,
    trim: true,
    default: '',
  },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
