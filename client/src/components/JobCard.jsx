import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, IndianRupeeIcon, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {job.jobType}
        </span>
      </div>
      <div className="mb-4">
        <p className="text-gray-600">{job.companyName}</p>
      </div>
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
        <div className="flex items-center">
          <MapPin size={16} className="mr-1" />
          {job.location}
        </div>
        <div className="flex items-center">
          <IndianRupeeIcon size={16} className="mr-1" />
          {job.salaryRange}
        </div>
        <div className="flex items-center">
          <Clock size={16} className="mr-1" />
          {job.experience} years
        </div>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 3).map((skill, index) => (
          <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            +{job.skills.length - 3} more
          </span>
        )}
      </div>
      <Link
        to={`/jobs/${job._id}`}
        className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
      >
        View Details
      </Link>
    </motion.div>
  );
};

export default JobCard;

