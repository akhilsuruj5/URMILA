const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    linkedin: { type: String, required: true },
    text: { type: String, required: true, maxlength: 400 },
    photo: { type: String },
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", TestimonialSchema);
