// import React, { useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const ResetPassword = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const { token } = useParams();
//   const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     setError("Passwords do not match");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(`https://urmila-webservice.onrender.com/reset-password/${token}`, { password });
  //     setMessage(response.data.msg);
  //     setError("");
  //     navigate("/login"); 
  //   } catch (err) {
  //     setError(err.response?.data?.msg || "Error resetting password");
  //     setMessage("");
  //   }
  // };

//   return (
//     <div className="flex flex-col items-center pt-32 min-h-screen  p-4">
//       <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {message && <p className="text-green-500 mb-4">{message}</p>}
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//         <label className="block mb-2 font-medium" htmlFor="password">New Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//         />
//         <label className="block mb-2 font-medium" htmlFor="confirm-password">Confirm Password:</label>
//         <input
//           type="password"
//           id="confirm-password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//           className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600 transition duration-200"
//         >
//           Reset Password
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

export default function ResetPassword() {
    const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`https://urmila-webservice.onrender.com/reset-password/${token}`, { password });
      setMessage(response.data.msg);
      setError("");
      setIsSubmitted(true)

    } catch (err) {
      setError(err.response?.data?.msg || "Error resetting password");
      setMessage("");
    }
  };
  return (
    <div className="container mx-auto pt-20 pb-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white  rounded-lg p-6 w-full max-w-md mx-auto"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm new password"
                />
                
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset Password
              <FiLock className="ml-2" />
            </motion.button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <FiCheck className="mx-auto text-4xl text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Password Reset Successful</h2>
            <p className="text-gray-600">
              Your password has been successfully reset. You can now log in with your new password.
            </p>
            <motion.a
              href="/login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 inline-block px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Login
            </motion.a>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
