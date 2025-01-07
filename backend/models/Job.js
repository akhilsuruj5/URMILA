const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    experience: {
      type: String, // e.g., "2+ years", "Fresher"
      required: true,
    },
    salary: {
      type: String, // e.g., "$50,000 - $70,000 per year"
    },
    companyName: {
      type: String,
      required: true,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter", // Reference to the recruiter user
      required: true,
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Internship', 'Contract'], // Restrict to predefined values
      required: true,
    },
    positions: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    skills: {
      type: [String], // List of required skills
      default: [],
    },
    state: {
      type: String,
      enum: ['active', 'inactive'], // Restrict to 'active' or 'inactive'
      default: 'active',
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;

