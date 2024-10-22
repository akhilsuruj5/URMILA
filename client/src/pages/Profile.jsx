import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiPhone, FiBriefcase, FiBook, FiLock, FiSave } from 'react-icons/fi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
// Simulated function to fetch user data from the database


export default function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    occupation: '',
    institution: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  
  const [error, setError] = useState('');

  const fetchUserData = async () => {
    let token = localStorage.getItem('token');
    
    if (!token) {
      setError('User not found, please log in again.');
      toast.error('User not found, please log in again.');
  
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:5000/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data._doc;
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error.response && error.response.status === 401) {
        // Token might have expired, try refreshing it
        try {
          const refreshResponse = await axios.post('http://localhost:5000/refresh-token');
          token = refreshResponse.data.accessToken;
          localStorage.setItem('token', token);
  
          // Retry fetching user data
          const retryResponse = await axios.get('http://localhost:5000/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          return await retryResponse.json();
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          setError('Session expired, please log in again.');
          toast.error('Session expired, please log in again.');
          localStorage.removeItem('token');
        }
      } else {
        setError('Error fetching user details');
        toast.error('Error fetching user details');
      }
    }
  };




  useEffect(() => {
    fetchUserData().then((data) => {
      console.log(data);
      setFormData(data)
      setIsLoading(false)
    })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated API call to update user profile
    console.log('Updating profile with:', formData)
    toast('Profile updated successfully!')
  }

  const handlePasswordReset = () => {
    // Simulated password reset functionality
    console.log('Password reset requested')
    toast('Password reset email sent. Check your inbox.')
  }


  if (error) {
    return <div className='text-center py-10 text-xl'>{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer /> 
      <div
        className="bg-white pb-20 rounded-lg p-6 w-full max-w-2xl mx-auto"
      >
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
        <p className="text-gray-600 mb-6">Update your profile information or reset your password.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
            <div className="relative">
              <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Professional">Professional</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
            <div className="relative">
              <FiBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="institution"
                name="institution"
                type="text"
                value={formData.institution}
                onChange={handleInputChange}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiSave className="mr-2" />
              Update Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handlePasswordReset}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiLock className="mr-2" />
              Reset Password
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  )
}