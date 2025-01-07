const Job = require('../models/Job'); 
const Application = require('../models/Applications'); 
const User = require('../models/User'); 
const Profile = require('../models/Profile'); 
const Recruiter = require('../models/Recruiter'); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getJobs = async = async (req, res) => {
    try {
      const jobs = await Job.find(); // Fetch all jobs from the database
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  };

 const getJobDetails = async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) return res.status(404).json({ message: "Job not found" });
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
// Create a new job posting
const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      experience,
      salaryRange,
      companyName,
      recruiter, // Recruiter's ID passed directly
      jobType,
      positions,
      skills,
      state
    } = req.body;

    // Validate required fields
    if (!title || !description || !location || !experience || !companyName || !jobType || !positions || !recruiter) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    // Create a new job document
    const newJob = new Job({
      title,
      description,
      location,
      experience,
      salary: salaryRange,
      companyName,
      recruiter, // Manually set recruiter ID
      jobType,
      positions,
      skills, // Optional field (default is [])
      state
    });

    // Save the job to the database
    const savedJob = await newJob.save();

    // Respond with the created job
    res.status(201).json({
      message: "Job posted successfully.",
      job: savedJob,
    });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ error: "An error occurred while posting the job." });
  }
};


const apply = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user.id; // Assumes user ID is extracted from authentication middleware

  try {
    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'The job you are trying to apply for does not exist.' });
    }

    // Fetch user and profile details
    const user = await User.findById(userId).select('name email phone');
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please log in again.' });
    }

    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({
        message: 'Profile information not found. Please complete your profile to apply for jobs.',
      });
    }

    // Validate required fields
    if (!user.name || !user.email || !user.phone) {
      return res.status(400).json({
        message: 'Incomplete profile or user data. Ensure your name, email, phone, and resume are filled.',
      });
    }

    // Check if the applicant has already applied for this job
    const existingApplication = await Application.findOne({ jobId, email: user.email });
    if (existingApplication) {
      return res.status(400).json({
        message: 'You have already applied for this job.',
      });
    }

    // Create a new application using data from user and profile
    const newApplication = new Application({
      jobId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      linkedIn: profile.linkedIn,
      portfolio: profile.portfolio,
      resumeLink: profile.resumeLink,
      coverLetter: profile.coverLetter || '', // Use profile cover letter or leave blank
    });

    // Save the application to the database
    await newApplication.save();

    return res.status(201).json({
      message: 'Your application has been successfully submitted.',
      application: newApplication,
    });
  } catch (error) {
    console.error('Error applying for job:', error);

    // Handle specific errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Invalid data format. Please check the input fields and try again.', 
        details: error.errors 
      });
    }

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({ 
        message: 'Invalid Job ID. Please try again with a valid Job ID.' 
      });
    }

    // General error
    return res.status(500).json({
      message: 'An unexpected error occurred. Please try again later.',
      error: error.message,
    });
  }
};


const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user contains the authenticated user's ID

    // console.log(1);
    // const user = await User.findById(userId).select('name email phone institution');
    // console.log(2);
    const profile = await Profile.findOne({ user: userId });
    // console.log(3);
    
    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }
    
    // console.log(3);
    return res.status(200).json({profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'Error fetching profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    // console.log("Update Profile API Called");

    // Log incoming request data
    const userId = req.user?.id; // Use optional chaining to avoid crashes if req.user is undefined
    // console.log("User ID from request:", userId);

    const { linkedIn, portfolio, resumeLink, coverLetter } = req.body;
    // console.log("Request body:", { linkedIn, portfolio, resumeLink, coverLetter });

    // Check if userId exists
    if (!userId) {
      console.error("User ID is undefined");
      return res.status(400).json({ message: "User ID is required" });
    }

    // Attempt to update or create the profile
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { linkedIn, portfolio, resumeLink, coverLetter },
      { new: true, upsert: true }
    );

    // Log the updated profile
    // console.log("Profile updated/created successfully:", profile);

    return res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Error updating profile" });
  }
};



const getRecruiterJob = async (req, res) => {
  try {
    const recruiter = req.user.id;
    const jobs = await Job.find({ recruiter });

    if (!jobs.length) {
      return res.status(404).json({ message: "No job listings found" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Error fetching jobs" });
  }
}

const updateJobPostDetails = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { title, description, location, experience, salary, companyName, jobType, positions, skills } = req.body;
    const recruiter = req.user.id;

    const job = await Job.findOne({ _id: jobId, recruiter });

    if (!job) {
      return res.status(404).json({ message: "Job not found or you are not the recruiter" });
    }

    job.title = title || job.title;
    job.description = description || job.description;
    job.location = location || job.location;
    job.experience = experience || job.experience;
    job.salary = salary || job.salary;
    job.companyName = companyName || job.companyName;
    job.jobType = jobType || job.jobType;
    job.positions = positions || job.positions;
    job.skills = skills || job.skills;

    await job.save();

    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Error updating job" });
  }
}


const deleteJobPost = async (req, res) => {
  try {
    const { jobId } = req.params;
    const recruiter = req.user.id;

    const job = await Job.findOne({ _id: jobId, recruiter });

    if (!job) {
      return res.status(404).json({ message: "Job not found or you are not the recruiter" });
    }

    await job.remove();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Error deleting job" });
  }
}

  const recruiterSignup = async (req, res) => {
  const { name, email, password, company, contact } = req.body;

  try {
    // Check if email already exists
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: 'Email already in use.' });
    }


    console.log(1);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log(2);
    // Create a new recruiter
    const recruiter = new Recruiter({
      name,
      email,
      password: hashedPassword,
      company,
      contact,
    });
    
    console.log(3);
    await recruiter.save();
    console.log(4);

    res.status(201).json({
      message: 'Recruiter registered successfully!',
      recruiterId: recruiter._id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const recruiterLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if recruiter exists
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found.' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, recruiter.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT with recruiterId
    const token = jwt.sign(
      { recruiterId: recruiter._id }, // Include recruiterId explicitly
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      recruiterId: recruiter._id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const getRecruiterDetails = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const recruiterId = decoded.recruiterId;  // Get recruiterId from the decoded token

    const recruiter = await Recruiter.findById(recruiterId);  // Use recruiterId here
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found.' });
    }
    
    res.json({ name: recruiter.name });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recruiter details', error: error.message });
  }
};


const getRecruiterJobs = async (req, res) => {
  try {
    // Extract recruiter ID from the JWT
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const recruiterId = decoded.recruiterId;

    // Fetch jobs posted by this recruiter
    const jobs = await Job.find({ recruiter: recruiterId });

    // Fetch applicant count for each job
    const jobsWithApplicantsCount = await Promise.all(jobs.map(async (job) => {
      const applicantCount = await Application.countDocuments({ jobId: job._id }); // Fixed field name
      return {
        ...job.toObject(),
        applicantCount
      };
    }));

    res.json(jobsWithApplicantsCount);
  } catch (error) {
    console.error('Error fetching recruiter jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



const jobDetails = async (req , res ) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the token and extract recruiter ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const recruiterId = decoded.recruiterId; // Assuming recruiterId is encoded in the token
    const { jobId } = req.params; // Extract jobId from the request parameters

    // Fetch the job by ID and ensure it belongs to the authenticated recruiter
    const job = await Job.findOne({ _id: jobId, recruiter: recruiterId });
    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    // Count the number of applicants for this job
    const applicantCount = await Application.countDocuments({ job: jobId });

    // Send job details along with the applicant count
    res.json({
      job: job.toObject(),
      applicantCount,
    });
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({ message: 'Error fetching job details', error: error.message });
  }
}


const viewApplicants = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const recruiterId = decoded.recruiterId;
    const { jobId } = req.params;

    const job = await Job.findOne({ _id: jobId, recruiter: recruiterId });
    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    const applicants = await Application.find({ jobId }).lean(); // Fetch all fields from ApplicationSchema
    console.log(applicants);
    res.json({ applicants });
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).json({ message: 'Error fetching applicants', error: error.message });
  }
};


// const deleteJob = async (req, res) => {
// const { jobId } = req.params; // Extract jobId from the URL parameter

//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const recruiterId = decoded.recruiterId;
//     // Find the job by jobId
//     const job = await Job.findById(jobId);
    
//     if (!job) {
//       return res.status(404).json({ message: 'Job not found' });
//     }

//     // Check if the job is associated with the logged-in recruiter
//     if (job.recruiter.toString() !== recruiterId) {
//       return res.status(403).json({ message: 'You are not authorized to delete this job' });
//     }

//     // Delete the job
//     await job.remove();

//     return res.status(200).json({ message: 'Job deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error deleting job' });
//   }
// };


// DELETE route for deleting a job without recruiter verification
const deleteJob = async (req, res) => {
  const { jobId } = req.params; // Extract jobId from URL parameters

  try {
    // Find the job by jobId
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Delete the job using deleteOne
    await Job.deleteOne({ _id: jobId });

    return res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting job' });
  }
};

const editJob = async (req, res) => {
  const jobId = req.params.jobId;
  const updatedData = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(jobId, updatedData, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Failed to update job details" });
  }
}


const allApplicants = async (req, res) => {
  try {
    // Extract Authorization Header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // Extract and Verify Token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing in Authorization header" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const recruiterId = decoded.recruiterId;

    console.log("Decoded Token:", decoded);
    console.log("Recruiter ID:", recruiterId);

    // Check the jobs posted by this recruiter
    const jobs = await Job.find({ recruiter: recruiterId });
    console.log("Jobs Posted by Recruiter:", jobs);

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this recruiter" });
    }

    // Construct Filter
    const filter = { 'jobId': { $in: jobs.map(job => job._id) } };
    const { jobId, status } = req.query;
    if (jobId) filter.jobId = jobId;
    if (status) filter.status = status;

    console.log("Constructed Filter:", filter);

    // Fetch Applications
    const applications = await Application.find(filter)
      .populate({
        path: 'jobId',
        select: 'title recruiter',
      });

    console.log("Applications Found:", applications);

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error Occurred:", error.message);

    // Token Errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    // Other Errors
    res.status(500).json({ error: "Error fetching applications" });
  }
};




module.exports = {
    getJobs,getJobDetails ,allApplicants, postJob, editJob, apply, getProfile , updateProfile , recruiterSignup, recruiterLogin , getRecruiterJobs , getRecruiterDetails , jobDetails , viewApplicants , deleteJob 
};
  