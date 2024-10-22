// import React, { useState } from "react";
// import axios from "axios";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/forgot-password", { email });
//       setMessage(response.data.msg);
//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.msg || "Error requesting password reset");
//       setMessage("");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center pt-32 min-h-screen p-4">
//       <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {message && <p className="text-green-500 mb-4">{message}</p>}
//       <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//         <label className="block mb-2 font-medium" htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600 transition duration-200"
//         >
//           Request Password Reset
//         </button>
//       </form>
//     </div>
//   );
// };


import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiArrowRight } from 'react-icons/fi'
import axios from 'axios'
import Loader from './Loader'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading , setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/forgot-password", { email });
      setMessage(response.data.msg);
      setError("");
      setIsLoading(false);
      setIsSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.msg || "Error requesting password reset");
      setMessage("");
    }
  };


  return (
    <div className="container mx-auto pb-40 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white  p-6 w-full max-w-md mx-auto"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
       {/* {message && <p className="text-green-500 mb-4">{message}</p>} */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-600 mb-4">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            {!isLoading ? (<motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Reset Instructions
              <FiArrowRight className="ml-2" />
            </motion.button>) : (<div className="flex justify-center items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>)}
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <FiMail className="mx-auto text-4xl text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Check Your Email</h2>
            <p className="text-gray-600">
              We've sent password reset instructions to your email. Please check your inbox and follow the link to reset your password.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}