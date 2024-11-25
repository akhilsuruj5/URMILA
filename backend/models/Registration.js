const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  offering: { type: mongoose.Schema.Types.ObjectId, ref: 'Offering', required: true }, 
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'cancelled'], 
    default: 'pending' 
  }, 
  registeredAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Registration', RegistrationSchema);
