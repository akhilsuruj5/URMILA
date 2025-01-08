import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';
import JobPageHeader from "../components/JobPageHeader";
import JobPageFooter from "../components/JobPageFooter";

import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Context/AuthContext";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); 
    }
  }, [isAuthenticated, navigate]);

  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://urmila-webservice.onrender.com/jobs"); // Adjust the endpoint if needed
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        console.log(data);
        setJobs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const searchJobHandler = () => {
    const filteredJobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(query.toLowerCase())
    );
    setJobs(filteredJobs);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <JobPageHeader />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center bg-gradient-to-r from-green-600 to-green-700 text-white py-16"
      >
        <div className="flex flex-col gap-5 my-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* <span className="mx-auto px-4 py-2 rounded-full bg-green-700 text-green-100 font-medium">
            No. 1 Job Hunt Website
          </span> */}
          <h1 className="text-4xl sm:text-5xl font-bold">
            Search, Apply & Get Your <span className="text-green-300">Dream Jobs</span>
          </h1>
          <p className="text-lg text-green-100">
            Explore opportunities that align with your skills and aspirations.
          </p>
          <div className="flex shadow-lg bg-white border border-gray-200 rounded-full items-center gap-4 mx-auto w-full max-w-2xl">
            <Search className="ml-4 text-gray-400" />
            <input
              type="text"
              placeholder="Find your dream jobs"
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none border-none w-full px-4 py-3 rounded-l-full text-gray-800"
            />
            <button
              onClick={searchJobHandler}
              className="bg-green-700 text-white px-6 py-3 rounded-r-full hover:bg-green-800 transition-colors duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </motion.div>

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto px-24">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Latest Jobs Available
          </h2>

          {loading && <p className="text-center text-gray-700">Loading jobs...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {jobs.length > 0 ? (
                jobs
                .filter((job) => job.state === 'active')
                .map((job) => (
                  <motion.div
                    key={job._id}
                    whileHover={{ scale: 1.03 }}
                    className="p-6 rounded-lg shadow-md bg-white border border-gray-200 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-semibold text-lg text-green-700">{job.companyName}</h2>
                      <div className="flex items-center text-gray-600">
                        <MapPin size={16} className="mr-1" />
                        <p className="text-sm">{job.location}</p>
                      </div>
                    </div>
                    <h1 className="font-bold text-xl mb-2 text-gray-900">{job.title}</h1>
                    <p className="text-sm text-gray-600 mb-4">{job.description.slice(0, 100)}...</p>
                    <div className="flex flex-wrap gap-2 mt-auto mb-4">
                      <span className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        <Briefcase size={14} className="mr-1" />
                        {job.positions} Positions
                      </span>
                      <span className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        <Clock size={14} className="mr-1" />
                        {job.jobType}
                      </span>
                      <span className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {/* <RuppeSign size={14} className="mr-1" /> */}
                        &#x20B9; {job.salary}
                      </span>
                    </div>
                    <Link
                      to={`/jobs/${job._id}`}
                      className="block text-center bg-green-700 text-white mt-2 px-4 py-2 rounded-md hover:bg-green-800 transition-colors duration-300"
                    >
                      View Details
                    </Link>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-700 col-span-full">No jobs available</p>
              )}
            </motion.div>
          )}
        </div>
      </main>

      <JobPageFooter />
    </div>
  );
};

export default JobsPage;

