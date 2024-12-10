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

RegistrationSchema.pre('find', function () {
  this.populate('user', 'name email occupation')
      .populate('offering', 'name type');
});

RegistrationSchema.pre('findOne', function () {
  this.populate('user', 'name email occupation')
      .populate('offering', 'name type');
});

module.exports = mongoose.model('Registration', RegistrationSchema);
