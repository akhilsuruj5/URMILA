import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    institution: "",
    occupation: "Student",
  });

  const [errors, setErrors] = useState({}); // State for handling errors

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/mycourses"); // Redirect to My Courses page
    }
  }, [isAuthenticated, navigate]);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/; // Example: 10-digit phone number
    return phoneRegex.test(phone);
  };

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1); // New state to track the current step

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Reset the error on input change
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };
  const handleOtpInput = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && /^\d$/.test(value)) {
      // Update OTP state
      const updatedOtp = otp.split("");
      updatedOtp[index] = value;
      setOtp(updatedOtp.join(""));

      // Focus on the next input
      if (index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !e.target.value) {
      const updatedOtp = otp.split("");
      updatedOtp[index] = ""; // Clear the current digit
      setOtp(updatedOtp.join(""));

      // Move focus to the previous input
      if (index > 0) {
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        if (prevInput) prevInput.focus();
      }
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.institution)
      newErrors.institution = "Institution is required";
    return newErrors;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const newErrors = validateStep1();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if validation fails
    } else {
      setErrorMessage("");
      setStep(step + 1); // Move to the next step if validation passes
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1); // Go back to Step 1
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isOtpSent) {
      try {
        setIsLoading(true); // Start loading
        const response = await axios.post(
          "https://urmila-backend.onrender.com/verify-otp",
          {
            email: formData.email,
            otp,
          }
        );
        const { token } = response.data;
        localStorage.setItem("token", token);
        setSuccessMessage(response.data.msg);
        setIsModalOpen(false); // Close modal
        navigate("/mycourses", { replace: true });
      } catch (error) {
        setErrorMessage(
          error.response?.data?.msg || "Error occurred during OTP verification."
        );
      } finally {
        setIsLoading(false); // End loading
      }
    } else {
      try {
        setIsLoading(true); // Start loading
        const response = await axios.post(
          "https://urmila-backend.onrender.com/register",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            institution: formData.institution,
            occupation: formData.occupation,
          }
        );

        setSuccessMessage(response.data.msg);
        setIsOtpSent(true);
        setIsModalOpen(true);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.msg || "Error occurred during registration."
        );
      } finally {
        setIsLoading(false); // End loading
      }
    }
  };

  return (
    <div className="flex justify-center px-4 sm:px-8 py-10 min-h-screen">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Sign up and start learning
        </h2>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}

        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
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
              <label className="block text-gray-700 font-medium mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Occupation <span className="text-red-500">*</span>
              </label>
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
              <label className="block text-gray-700 font-medium mb-1">
                Institution/Organization Name{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.institution && (
                <p className="text-red-500 text-sm">{errors.institution}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded-md text-lg transition-colors ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isLoading ? "Sending OTP..." : "Submit"}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Enter OTP
            </h3>
            <p className="text-gray-600 text-center mb-4">
              A 6-digit OTP has been sent to your registered email.
            </p>
            <div className="flex justify-center space-x-2 mb-6">
              {/* OTP input boxes */}
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  id={`otp-input-${index}`}
                  onChange={(e) => handleOtpInput(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  className="w-12 h-12 text-center text-2xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-2 rounded-md text-lg transition-colors ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
            {/* <button
            onClick={handleResendOtp}
            className="w-full text-blue-500 mt-4 hover:underline text-sm"
          >
            Resend OTP
          </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router';
// import { useAuth } from '../Context/AuthContext';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { RotatingLines } from 'react-loader-spinner';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//     institution: '',
//     occupation: 'Student',
//   });

//   const [errors, setErrors] = useState({}); // State for handling errors
//   const [loading, setLoading] = useState(false); // State for loading
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/mycourses'); // Redirect to My Courses page
//     }
//   }, [isAuthenticated, navigate]);

//   const validatePhoneNumber = (phone) => {
//     const phoneRegex = /^\d{10}$/; // Example: 10-digit phone number
//     return phoneRegex.test(phone);
//   };

//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [step, setStep] = useState(1); // New state to track the current step

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: '' }); // Reset the error on input change
//   };

//   const handleOtpChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const validateStep1 = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.email) newErrors.email = 'Email is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     return newErrors;
//   };

//   const validateStep2 = () => {
//     const newErrors = {};
//     if (!formData.phone) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!validatePhoneNumber(formData.phone)) {
//       newErrors.phone = 'Please enter a valid 10-digit phone number';
//     }
//     if (!formData.institution) newErrors.institution = 'Institution is required';
//     return newErrors;
//   };

//   const handleNextStep = (e) => {
//     e.preventDefault();
//     const newErrors = validateStep1();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors); // Set errors if validation fails
//     } else {
//       setStep(step + 1); // Move to the next step if validation passes
//     }
//   };

//   const handlePreviousStep = () => {
//     setStep(step - 1); // Go back to Step 1
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validateStep2();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors); // Set errors if validation fails
//       return;
//     }

//     setLoading(true); // Show loader
//     setErrors({});
//     if (isOtpSent) {
//       // OTP verification request
//       try {
//         const response = await axios.post('http://localhost:5000/verify-otp', {
//           email: formData.email,
//           otp,
//         });
//         const { token } = response.data;
//         localStorage.setItem('token', token);
//         setIsModalOpen(false);
//         toast.success(response.data.msg); // Show success message
//         navigate('/mycourses', { replace: true });
//       } catch (error) {
//         toast.error(error.response?.data?.msg || 'Error occurred during OTP verification.');
//       }
//     } else {
//       // Registration request
//       try {
//         const response = await axios.post('http://localhost:5000/register', {
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           phone: formData.phone,
//           institution: formData.institution,
//           occupation: formData.occupation,
//         });

//         toast.success(response.data.msg); // Show success message
//         setIsOtpSent(true);
//         setIsModalOpen(true);
//       } catch (error) {
//         toast.error(error.response?.data?.msg || 'Error occurred during registration.');
//       }
//     }
//     setLoading(false); // Hide loader
//   };

//   return (
//     <div className="flex justify-end pr-36 pt-20 min-h-screen ">
//       <div className="p-8 rounded-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-10 text-center text-gray-700">Sign up and start learning</h2>

//         {/* Loader */}
//         {loading && (
//           <div className="flex justify-center my-4">
//             <RotatingLines
//               strokeColor="blue"
//               strokeWidth="5"
//               animationDuration="0.75"
//               width="50"
//               visible={true}
//             />
//           </div>
//         )}

//         {/* Step 1: Basic Information */}
//         {step === 1 && (
//           <form onSubmit={handleNextStep} className="space-y-6">
//             <div>
//               <label className=" text-gray-700 font-medium mb-1">Name <span className="text-red-500">*</span></label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Email <span className="text-red-500">*</span></label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Password <span className="text-red-500">*</span></label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
//             >
//               Next
//             </button>

//             <p className="text-center mt-4">
//               Already have an account?{" "}
//               <a href="/login" className="text-blue-500 hover:underline">
//                 Login
//               </a>
//             </p>
//           </form>
//         )}

//         {step === 2 && (
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Phone Number <span className="text-red-500">*</span></label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Occupation <span className="text-red-500">*</span></label>
//               <select
//                 name="occupation"
//                 value={formData.occupation}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               >
//                 <option value="Student">Student</option>
//                 <option value="Professional">Professional</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Institution <span className="text-red-500">*</span></label>
//               <input
//                 type="text"
//                 name="institution"
//                 value={formData.institution}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               {errors.institution && <p className="text-red-500 text-sm">{errors.institution}</p>}
//             </div>

//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 onClick={handlePreviousStep}
//                 className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
//               >
//                 Previous
//               </button>
//               <button
//                 type="submit"
//                 className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
//               >
//                 Submit
//               </button>
//             </div>

//             <p className="text-center mt-4">
//               Already have an account?{" "}
//               <a href="/login" className="text-blue-500 hover:underline">
//                 Login
//               </a>
//             </p>
//           </form>
//         )}

//         {/* OTP Modal */}
//         {isModalOpen && (
//           <div className="modal">
//             <div className="modal-content">
//               <h2>Enter OTP</h2>
//               <input
//                 type="text"
//                 name="otp"
//                 value={otp}
//                 onChange={handleOtpChange}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <button onClick={handleSubmit} className="btn btn-primary">
//                 Verify OTP
//               </button>
//             </div>
//           </div>
//         )}

//         <ToastContainer /> {/* Toastify Container */}
//       </div>
//     </div>
//   );
// };

// export default Signup;
