import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { User, Briefcase, Link, FileText, Mail, Phone, School, Loader, AlertCircle } from 'lucide-react';
import JobPageFooter from '../components/JobPageFooter';
import JobPageHeader from '../components/JobPageHeader';

import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Context/AuthContext";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "",
    linkedIn: "",
    portfolio: "",
    resumeLink: "",
    coverLetter: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

      const navigate = useNavigate();
      const { isAuthenticated } = useAuth();
    
      // useEffect(() => {
      //   if (!isAuthenticated) {
      //     navigate('/login'); 
      //   }
      // }, [isAuthenticated, navigate]);

      
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication expired. Please log in again.");
        window.location.href = "/login";
        return;
      }

      try {
        setLoading(true);
        const [userResponse, profileResponse] = await Promise.all([
          axios.get("http://localhost:5000/user", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/profile", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        setUserData({
          ...userResponse.data._doc,
          ...profileResponse.data.profile,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to load profile. Please try again.");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Authentication expired. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      const { name, email, phone, institution, ...profileData } = userData;
      await Promise.all([
        // axios.put("http://localhost:5000/user", { name, email, phone, institution }, {
        //   headers: { Authorization: `Bearer ${token}` },
        // }),
        axios.put("http://localhost:5000/profile", profileData, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);

      setIsEditing(false);
      setLoading(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">

        <JobPageHeader />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader className="animate-spin text-blue-500" size={48} />
      </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <JobPageHeader />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100"
    >
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-3 rounded-full">
              <User size={48} className="text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{userData.name}</h1>
              <p className="text-blue-100">{userData.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <AnimatePresence>
              {isEditing ? (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Non-editable Fields */}
  <div>
    <label className="block text-gray-700 mb-2" htmlFor="name">
      <User className="inline-block mr-2" size={18} />
      Name
    </label>
    {isEditing ? (
      <input
        type="text"
        id="name"
        name="name"
        value={userData.name}
        className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
        readOnly
      />
    ) : (
      <p className="text-gray-600">{userData.name || "Not provided"}</p>
    )}
  </div>

  <div>
    <label className="block text-gray-700 mb-2" htmlFor="email">
      <Mail className="inline-block mr-2" size={18} />
      Email
    </label>
    {isEditing ? (
      <input
        type="email"
        id="email"
        name="email"
        value={userData.email}
        className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
        readOnly
      />
    ) : (
      <p className="text-gray-600">{userData.email || "Not provided"}</p>
    )}
  </div>

  <div>
    <label className="block text-gray-700 mb-2" htmlFor="phone">
      <Phone className="inline-block mr-2" size={18} />
      Phone
    </label>
    {isEditing ? (
      <input
        type="tel"
        id="phone"
        name="phone"
        value={userData.phone}
        className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
        readOnly
      />
    ) : (
      <p className="text-gray-600">{userData.phone || "Not provided"}</p>
    )}
  </div>

  <div>
    <label className="block text-gray-700 mb-2" htmlFor="linkedIn">
      <Briefcase className="inline-block mr-2" size={18} />
      LinkedIn
    </label>
    {isEditing ? (
      <input
        type="url"
        id="linkedIn"
        name="linkedIn"
        value={userData.linkedIn}
        className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
        readOnly
      />
    ) : (
      <p className="text-gray-600">{userData.linkedIn || "Not provided"}</p>
    )}
  </div>

  {/* Editable Fields */}
  <div>
    <label className="block text-gray-700 mb-2" htmlFor="portfolio">
      <Link className="inline-block mr-2" size={18} />
      Portfolio
    </label>
    <input
      type="url"
      id="portfolio"
      name="portfolio"
      value={userData.portfolio}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Portfolio URL"
    />
  </div>

  <div>
    <label className="block text-gray-700 mb-2" htmlFor="resumeLink">
      <FileText className="inline-block mr-2" size={18} />
      Resume Link
    </label>
    <input
      type="url"
      id="resumeLink"
      name="resumeLink"
      value={userData.resumeLink}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Resume Link"
    />
  </div>
</div>


                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="coverLetter">
                      <FileText className="inline-block mr-2" size={18} />
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={userData.coverLetter}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your cover letter"
                      rows="4"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Save Profile
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField icon={<User size={18} />} label="Name" value={userData.name} />
                    <ProfileField icon={<Mail size={18} />} label="Email" value={userData.email} />
                    <ProfileField icon={<Phone size={18} />} label="Phone" value={userData.phone} />
                    <ProfileField icon={<School size={18} />} label="Institution" value={userData.institution} />
                    <ProfileField icon={<Briefcase size={18} />} label="LinkedIn" value={userData.linkedIn} />
                    <ProfileField icon={<Link size={18} />} label="Portfolio" value={userData.portfolio} />
                    <ProfileField icon={<FileText size={18} />} label="Resume Link" value={userData.resumeLink} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Cover Letter</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">{userData.coverLetter}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
    <JobPageFooter />
    </div>
  );
};

const ProfileField = ({ icon, label, value }) => (
  <div>
    <div className="flex items-center text-gray-700 mb-1">
      {icon}
      <span className="ml-2 font-semibold">{label}</span>
    </div>
    <p className="text-gray-600">{value || 'Not provided'}</p>
  </div>
);

export default ProfilePage;

