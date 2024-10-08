// import React, { useState } from 'react';
// import axios from 'axios';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//   });

//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleOtpChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');
//     setSuccessMessage('');

//     if (isOtpSent) {
//       try {
//         const response = await axios.post('http://localhost:5000/verify-otp', {
//           email: formData.email,
//           otp,
//         });

//         setSuccessMessage(response.data.msg);
//         // Optionally redirect to the completion registration page
//         // window.location.href = '/complete-registration';
//       } catch (error) {
//         setErrorMessage(error.response?.data?.msg || 'Error occurred during OTP verification.');
//       }
//     } else {
//       // If OTP is not sent, send it
//       try {
//         const response = await axios.post('http://localhost:5000/register', {
//           name: formData.name,
//           email: formData.email,
//         });

//         setSuccessMessage(response.data.msg);
//         setIsOtpSent(true); // Set to true to show OTP input
//         setFormData({ name: '', email: '' }); // Reset form data
//       } catch (error) {
//         setErrorMessage(error.response?.data?.msg || 'Error occurred during registration.');
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>

//         {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
//         {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {!isOtpSent && (
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Email</label>
//             <input    
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           {/* OTP Field (only show after sending OTP) */}
//           {isOtpSent && (
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Enter OTP</label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={handleOtpChange}
//                 required
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//           >
//             {isOtpSent ? 'Verify OTP' : 'Next'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });

//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
//   const navigate = useNavigate()
  
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleOtpChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');
//     setSuccessMessage('');
  
//     if (isOtpSent) {
//       try {
//         console.log("Sending OTP verification", formData);  // Checking formData
  
//         const response = await axios.post('http://localhost:5000/verify-otp', {
//           email: formData.email,
//           otp,
//         });
  
//         console.log("OTP verification response:", response.data);  // Check if response is returned here
  
//         const { token } = response.data;
//         localStorage.setItem('token', token);  // Storing token correctly as 'authToken'
//         setSuccessMessage(response.data.msg); // Set the success message
//         // Redirect to the complete registration page
//         navigate('/complete-registration', { replace: true });
//       } catch (error) {
//         console.error("OTP Verification Error", error);  // Log any potential error
//         setErrorMessage(error.response?.data?.msg || 'Error occurred during OTP verification.');
//       }
//     } else {
//       try {
//         const response = await axios.post('http://localhost:5000/register', {
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//         });
  
//         setSuccessMessage(response.data.msg);
//         setIsOtpSent(true);
//         setIsModalOpen(true); 
//       } catch (error) {
//         console.error("Registration Error", error);  // Logging the error in case
//         setErrorMessage(error.response?.data?.msg || 'Error occurred during registration.');
//       }
//     }
//   };

  
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>

//         {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
//         {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

//         <form onSubmit={handleSubmit} className="space-y-6">
      
//             <>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//             </>
        

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//           >
//             Next
//           </button>
//         </form>
//       </div>

//       {/* OTP Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//           <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//             <h3 className="text-xl font-bold mb-4 text-center">Enter OTP</h3>
//             <input
//               type="text"
//               value={otp}
//               onChange={handleOtpChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
//               placeholder="Enter OTP"
//             />
//             <button
//               onClick={handleSubmit}
//               className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//             >
//               Verify OTP
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Signup;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAuth } from '../Context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    institution: '',
    occupation: 'Student',
  });

  const [errors, setErrors] = useState({}); // State for handling errors

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/mycourses'); // Redirect to My Courses page
    }
  }, [isAuthenticated, navigate]);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/; // Example: 10-digit phone number
    return phoneRegex.test(phone);
  };

  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1); // New state to track the current step

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Reset the error on input change
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.institution) newErrors.institution = 'Institution is required';
    return newErrors;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const newErrors = validateStep1();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if validation fails
    } else {
      setErrorMessage('');
      setStep(step + 1); // Move to the next step if validation passes
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1); // Go back to Step 1
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateStep2();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if validation fails
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');

    if (isOtpSent) {
      try {
        const response = await axios.post('http://localhost:5000/verify-otp', {
          email: formData.email,
          otp,
        });
        const { token } = response.data;
        localStorage.setItem('token', token);
        setSuccessMessage(response.data.msg);
        navigate('/mycourses', { replace: true });
      } catch (error) {
        setErrorMessage(error.response?.data?.msg || 'Error occurred during OTP verification.');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          institution: formData.institution,
          occupation: formData.occupation,
        });

        setSuccessMessage(response.data.msg);
        setIsOtpSent(true);
        setIsModalOpen(true);
      } catch (error) {
        setErrorMessage(error.response?.data?.msg || 'Error occurred during registration.');
      }
    }
  };

  return (
    <div className="flex justify-end pr-36 pt-20 min-h-screen ">
      <div className="p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-10 text-center text-gray-700">Sign up and start learning</h2>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-6">
            <div>
              <label className=" text-gray-700 font-medium mb-1">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password <span className="text-red-500">*</span></label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Next
            </button>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Occupation <span className="text-red-500">*</span></label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Student">Student</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Institution/Organization Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.institution && <p className="text-red-500 text-sm">{errors.institution}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={handlePreviousStep}
              className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition-colors mt-4"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;