const mongoose = require('mongoose');

const OfferingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['course', 'mentorship'],
    required: true,
  },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  maxCapacity: { type: Number, default: null },
  tableOfContent: { type: [String], default: [] },
  studyMaterialLink: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Offering', OfferingSchema);
