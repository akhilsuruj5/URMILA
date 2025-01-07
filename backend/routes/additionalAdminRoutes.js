const express = require("express");
const Recruiter = require("../models/Recruiter");
const Applications = require("../models/Applications");
const Job = require("../models/Job");
const router = express.Router();

router.get('/admin/recruiters', async (req, res) => {
    try {
      const recruiters = await Recruiter.find().sort({ createdAt: -1 });
      res.json(recruiters);
    } catch (error) {
      console.error('Error fetching recruiters:', error);
      res.status(500).json({ error: 'Server error' });
    }
});

// Example endpoint to fetch jobs for a specific recruiter
router.get('/admin/recruiters/:recruiterId/jobs', async (req, res) => {
  const { recruiterId } = req.params;
  try {
    // console.log(recruiterId);
    const jobs = await Job.find({ recruiter: recruiterId }); // Correct field name
    // console.log(jobs);
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});




router.get('/admin/applications' , async (req, res) => {
    try {
      const applications = await Applications.find()
        .populate('jobId', 'title description location requirements') // Populate job details
        .exec();
  
      res.status(200).json(applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;