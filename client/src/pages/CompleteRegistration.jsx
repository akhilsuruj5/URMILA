import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const CompleteRegistration = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    mobileNumber: '',
    currentOccupation: '',
    instituteOrOrganizationName: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    mobileNumber: '',
    currentOccupation: '',
    instituteOrOrganizationName: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error message for the field being updated
    setErrorMessages({ ...errorMessages, [e.target.name]: '' });
  };

  const validateMobileNumber = (number) => {
    const regex = /^[0-9]{10}$/; // Regular expression for a valid 10-digit mobile number
    return regex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages({}); // Reset error messages
    setSuccessMessage('');

    // Validate mobile number
    if (!validateMobileNumber(formData.mobileNumber)) {
      setErrorMessages((prev) => ({
        ...prev,
        mobileNumber: 'Mobile number must be a valid 10-digit number',
      }));
      return; // Stop submission if validation fails
    }

    // Ensure current occupation is selected
    if (!formData.currentOccupation) {
      setErrorMessages((prev) => ({
        ...prev,
        currentOccupation: 'Please select your occupation',
      }));
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/complete-registration', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Include JWT token if you're using it
      });
      setSuccessMessage(response.data.msg);
      navigate('/mycourses');
    } catch (error) {
      setErrorMessages((prev) => ({
        ...prev,
        server: error.response?.data?.msg || 'Error completing registration.',
      }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Complete Registration</h2>
        {errorMessages.server && <p className="text-red-600 mb-4">{errorMessages.server}</p>}
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              required
            />
            {errorMessages.mobileNumber && (
              <p className="text-red-600 text-sm">{errorMessages.mobileNumber}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Current Occupation</label>
            <select
              name="currentOccupation"
              value={formData.currentOccupation}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              
            >
              <option value="" disabled>Select Occupation</option>
              <option value="Student">Student</option>
              <option value="Professional">Professional</option>
            </select>
            {errorMessages.currentOccupation && (
              <p className="text-red-600 text-sm">{errorMessages.currentOccupation}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Institute/Organization Name</label>
            <input
              type="text"
              name="instituteOrOrganizationName"
              value={formData.instituteOrOrganizationName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              required
            />
            {errorMessages.instituteOrOrganizationName && (
              <p className="text-red-600 text-sm">{errorMessages.instituteOrOrganizationName}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-500 transition duration-200"
          >
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteRegistration;
