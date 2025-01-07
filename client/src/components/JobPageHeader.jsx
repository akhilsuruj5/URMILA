import React from "react";
import { Link } from "react-router-dom";
import { Briefcase } from 'lucide-react';

const JobPageHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/jobs" className="flex items-center text-green-700 font-bold text-xl">
            <Briefcase className="mr-2" />
            URMILA Job Portal
          </Link>
          <div className="flex space-x-12">
            <Link to="/" className="text-gray-600 hover:text-green-700">Home</Link>
            <Link to="/jobs" className="text-gray-600 hover:text-green-700">Jobs</Link>
            <Link to="/browsejobs" className="text-gray-600 hover:text-green-700">Job Search</Link>
            <Link to="/jobprofile" className="text-gray-600 hover:text-green-700">Profile</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default JobPageHeader;
