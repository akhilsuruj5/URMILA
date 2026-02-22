// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Briefcase, MapPin, IndianRupeeIcon as RupeeSign, Clock, X } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import styles for toast
// import axios from 'axios';
// import JobPageHeader from '../components/JobPageHeader';
// import JobPageFooter from '../components/JobPageFooter';

// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../Context/AuthContext";

// const JobDetailsPage = () => {
//   const { jobId } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     linkedIn: '',
//     portfolio: '',
//     resumeLink: '',
//     coverLetter: '',
//   });

//     const navigate = useNavigate();
//     const { isAuthenticated } = useAuth();

//     useEffect(() => {
//       if (!isAuthenticated) {
//         navigate('/login');
//       }
//     }, [isAuthenticated, navigate]);

//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       try {
//         const response = await axios.get(`https://urmila-webservice.onrender.com/jobs/${jobId}`);
//         setJob(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch job details');
//         toast.error('Failed to fetch job details');
//         setLoading(false);
//       }
//     };

//     fetchJobDetails();
//   }, [jobId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`https://urmila-webservice.onrender.com/jobs/${jobId}/apply`, formData);
//       toast.success('Application submitted successfully!');
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error('Error submitting application:', error);

//       if (error.response?.data?.details) {
//         // Extract detailed validation errors from the response
//         const details = error.response.data.details;
//         const errorMessages = Object.values(details)
//           .map((detail) => detail.message)
//           .join('\n');
//         toast.error(errorMessages); // Show all validation messages
//       } else {
//         // Fallback for general errors
//         toast.error(
//           error.response?.data?.message || 'Failed to submit application. Please try again.'
//         );
//       }
//     }
//   };

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
//   if (!job) return <div className="text-center py-10">Job not found</div>;

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <JobPageHeader />

//       <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white shadow-lg rounded-lg overflow-hidden"
//         >
//           <div className="p-6 sm:p-10">
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
//             <div className="flex flex-wrap gap-4 mb-6">
//               <span className="flex items-center text-gray-600">
//                 <Briefcase className="mr-2" size={18} />
//                 {job.companyName}
//               </span>
//               <span className="flex items-center text-gray-600">
//                 <MapPin className="mr-2" size={18} />
//                 {job.location}
//               </span>
//               <span className="flex items-center text-gray-600">
//                 <RupeeSign className="mr-2" size={18} />
//                 {job.salary}
//               </span>
//               <span className="flex items-center text-gray-600">
//                 <Clock className="mr-2" size={18} />
//                 {job.experience} years experience
//               </span>
//             </div>
//             <div className="prose max-w-none mb-8">
//               <h2 className="text-xl font-semibold mb-2">Job Description</h2>
//               <p>{job.description}</p>
//             </div>
//             <div className="prose max-w-none mb-8">
//               <h2 className="text-xl font-semibold mb-2">Skills Required</h2>
//               <ul>
//                 {job.skills.map((skill, index) => (
//                   <li key={index}>{skill}</li>
//                 ))}
//               </ul>
//             </div>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition-colors duration-300"
//             >
//               Apply Now
//             </button>
//           </div>
//         </motion.div>
//       </main>

//       <JobPageFooter />

//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-2xl font-bold text-gray-900">Apply for {job.title}</h2>
//                   <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
//                     <X size={24} />
//                   </button>
//                 </div>
//                 <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-md">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       required
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       required
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       required
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
//                     <input
//                       type="url"
//                       id="linkedIn"
//                       name="linkedIn"
//                       required
//                       value={formData.linkedIn}
//                       onChange={handleInputChange}
//                       className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">Portfolio (Optional)</label>
//                     <input
//                       type="url"
//                       id="portfolio"
//                       name="portfolio"
//                       value={formData.portfolio}
//                       onChange={handleInputChange}
//                       className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700">Resume Link</label>
//                     <input
//                       type="url"
//                       id="resumeLink"
//                       name="resumeLink"
//                       required
//                       value={formData.resumeLink}
//                       onChange={handleInputChange}
//                       className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">Cover Letter</label>
//                     <textarea
//                       id="coverLetter"
//                       name="coverLetter"
//                       rows={4}
//                       value={formData.coverLetter}
//                       onChange={handleInputChange}
//                       className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
//                     ></textarea>
//                   </div>
//                   <div>
//                     <button
//                       type="submit"
//                       className="w-full bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors duration-300"
//                     >
//                       Submit Application
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// };

// export default JobDetailsPage;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  IndianRupeeIcon as RupeeSign,
  Clock,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import JobPageHeader from "../components/JobPageHeader";
import JobPageFooter from "../components/JobPageFooter";
import { useAuth } from "../Context/AuthContext";

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false); // Track application status
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `https://urmila-webservice.onrender.com/jobs/${jobId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setJob(response.data);

        // Check if the user has already applied for the job
        const applicationStatus = await axios.get(
          `https://urmila-webservice.onrender.com/jobs/${jobId}/application-status`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setHasApplied(applicationStatus.data.applied); // Use `applied` instead of `hasApplied`

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch job details");
        toast.error("Failed to fetch job details");
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, navigate]);

  const handleApply = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Authentication expired. Please log in again.");
      window.location.href = "/login";
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to apply for the position: ${job.title}?`
    );
    if (confirmed) {
      try {
        await axios.post(
          `https://urmila-webservice.onrender.com/jobs/${jobId}/apply`,
          {}, // Empty body
          {
            headers: { Authorization: `Bearer ${token}` }, // Correct header structure
          }
        );
        toast.success("Application submitted successfully!");
        setHasApplied(true); // Update the state to disable the button
      } catch (error) {
        console.error("Error submitting application:", error);
        toast.error(
          error.response?.data?.message ||
          "Failed to submit application. Please try again."
        );
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!job) return <div className="text-center py-10">Job not found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <JobPageHeader />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-6 sm:p-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="flex items-center text-gray-600">
                <Briefcase className="mr-2" size={18} />
                {job.companyName}
              </span>
              <span className="flex items-center text-gray-600">
                <MapPin className="mr-2" size={18} />
                {job.location}
              </span>
              <span className="flex items-center text-gray-600">
                <RupeeSign className="mr-2" size={18} />
                {job.salary}
              </span>
              <span className="flex items-center text-gray-600">
                <Clock className="mr-2" size={18} />
                {job.experience} experience
              </span>
            </div>
            <div className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold mb-2">Job Description</h2>
              <p style={{ whiteSpace: "pre-line" }}>{job.description}</p>
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold mb-2">Skills Required</h2>
              <ul>
                {job.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={handleApply}
              disabled={hasApplied} // Disable button if already applied
              className={`px-6 py-3 rounded-md transition-colors duration-300 ${hasApplied
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-700 text-white hover:bg-green-800"
                }`}
            >
              {hasApplied ? "Applied" : "Apply Now"}
            </button>
          </div>
        </motion.div>
      </main>

      <JobPageFooter />
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default JobDetailsPage;
