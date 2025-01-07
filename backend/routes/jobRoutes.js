const express = require('express');
const { getJobs , getJobDetails, postJob,jobDetails, allApplicants ,viewApplicants, editJob ,apply, deleteJob , getProfile, updateProfile, recruiterSignup, recruiterLogin , getRecruiterDetails ,getRecruiterJobs  } = require('../controllers/jobController');
const authenticateToken = require('../middlewares/auth');
const Applications = require('../models/Applications');
const { default: mongoose } = require('mongoose');
const User = require('../models/User');
const Job = require('../models/Job');
const router = express.Router();

router.get("/jobs", getJobs);
router.get("/jobs/:id", getJobDetails);

router.get('/profile', authenticateToken , getProfile );
router.post('/jobs/:jobId/apply', authenticateToken , apply);


router.get('/jobs/:jobId/application-status', authenticateToken, async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user.id; // Ensure userEmail is correctly set

  
  const user = await User.findById(userId).select('name email phone');
  if (!user) {
    return res.status(404).json({ message: 'User not found. Please log in again.' });
  }
  if (!user.email) {
    return res.status(400).json({ error: 'User email is required' });
  }

  try {
    // Use mongoose.Types.ObjectId properly
    const application = await Applications.findOne({ jobId, email: user.email });


    if (application) {
      return res.status(200).json({
        applied: true,
        status: application.status, // Provide the application status
        message: 'You have already applied for this job.',
      });
    }

    res.status(200).json({
      applied: false,
      message: 'You have not applied for this job.',
    });
  } catch (err) {
    console.error('Error while checking application status:', err);
    res.status(500).json({ error: 'Failed to fetch application status' });
  }
});


router.put('/profile', authenticateToken ,updateProfile);

router.post("/recruiter/jobs", postJob);
// router.get("/recruiter/jobs", getRecruiterJob);
// router.put("/recruiter/job/:jobId", updateJobPostDetails);
// router.delete("/recruiter/job/:jobId" , deleteJobPost);
router.post('/recruiter/signup', recruiterSignup);
router.post('/recruiter/login', recruiterLogin);
router.get('/recruiter/jobs', getRecruiterJobs);
router.get('/recruiter/jobs/:jobId', jobDetails);
router.get('/recruiter/details', getRecruiterDetails);

router.get('/recruiter/viewapplicants/:jobId', viewApplicants);

router.put('/recruiter/jobs/:jobId', editJob);

router.delete('/recruiter/jobs/:jobId', deleteJob);

router.get('/recruiter/applications', allApplicants);



  router.put('/recruiter/applications/:id/status', async (req, res) => {
    try {
      const { status } = req.body;
      const { id } = req.params;
  
  
      // Ensure status is valid
      const validStatuses = ['Pending', 'Shortlisted', 'Rejected', 'Accepted'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
  
      // Find the applicant and update their status
      const applicant = await Applications.findByIdAndUpdate(
        id,
        { status, updatedAt: new Date() },
        { new: true } // Returns the updated document
      );
  
      if (!applicant) {
        return res.status(404).json({ message: 'Applicant not found' });
      }
  
      res.json(applicant); // Return the updated applicant data
    } catch (err) {
      console.error('Error during status update:', err);  // Log the full error object
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.patch("/recruiter/jobs/status/:id", async (req, res) => {
    try {
      const jobId = req.params.id;
      const { state } = req.body;
  
      if (!state || !['active', 'inactive'].includes(state.toLowerCase())) {
        return res.status(400).json({ message: "Invalid state value" });
      }
  
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      // Update the state
      job.state = state.toLowerCase();
      await job.save();
  
      res.json({ message: "Job state updated successfully", state: job.state });
    } catch (error) {
      console.error("Error updating job state:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  });
  
  
  


module.exports = router;
