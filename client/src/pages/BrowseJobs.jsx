import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import JobPageHeader from '../components/JobPageHeader';
import JobPageFooter from '../components/JobPageFooter';
import FilterCard from '../components/FilterCard';
import JobCard from '../components/JobCard';

import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Context/AuthContext";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});

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
        const response = await axios.get('https://urmila-webservice.onrender.com/jobs');
        setJobs(response.data);
        setFilteredJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeFilters.location) {
      filtered = filtered.filter(job => job.location === activeFilters.location);
    }
    if (activeFilters.industry) {
      filtered = filtered.filter(job => job.title.includes(activeFilters.industry));
    }
    if (activeFilters.salary) {
      // Implement salary filtering logic here
    }

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, activeFilters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilter = useCallback((filters) => {
    setActiveFilters(filters);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <JobPageHeader />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Jobs</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/4"
          >
            <FilterCard onFilter={handleFilter} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-3/4"
          >
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {loading && <p className="text-center text-gray-700">Loading jobs...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && (
              <div className="space-y-4">
                {filteredJobs
                  .filter((job) => job.state === 'active')
                  .map(job => (
                    <JobCard key={job._id} job={job} />
                  ))}
                {filteredJobs.length === 0 && (
                  <p className="text-center text-gray-700">No jobs found matching your criteria.</p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <JobPageFooter />
    </div>
  );
};

export default BrowseJobs;

