import React from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignmentMentorship = () => {
  const handleRegister = () => {
    toast.success("Registration Initiated! You will receive a call.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <ToastContainer />
      <div className="container mx-auto py-16 px-4">
        {/* Header Section */}
        <motion.h1
          className="text-4xl font-bold text-center text-green-700 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          Assignment-Based Mentorship
        </motion.h1>

        {/* Description Section */}
        <motion.div
          className="bg-green-100 p-8 rounded-lg shadow-md max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
        >
          <p className="text-lg leading-7 mb-4">
            Our assignment-based mentorship is designed to provide hands-on
            experience and practical learning through specific, real-world
            assignments. This structured approach allows mentees to apply
            theoretical knowledge to actual industry challenges, facilitating a
            deeper understanding of key concepts and helping them build critical
            skills.
          </p>
          <p className="text-lg leading-7">
            By working on these assignments under the guidance of expert
            mentors, you will gain the confidence and expertise required to
            tackle real-world problems in your chosen field.
          </p>
        </motion.div>

        {/* Program Details Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">
            Program Details
          </h2>
          <ul className="list-disc pl-6 max-w-3xl mx-auto text-lg leading-7 space-y-3">
            <li>Duration: 6 weeks of structured assignments.</li>
            <li>Mode: Fully online, with flexible hours.</li>
            <li>
              Access to a personal mentor who reviews your work and provides
              feedback.
            </li>
            <li>
              Industry-relevant assignments to build portfolio-ready projects.
            </li>
          </ul>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">
            Benefits of Joining
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-green-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                Hands-On Experience
              </h3>
              <p className="text-gray-700">
                Work on real-world assignments that simulate industry scenarios
                and challenges.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                Personalized Feedback
              </h3>
              <p className="text-gray-700">
                Get tailored guidance from experienced mentors to improve your
                skills.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                Build Your Portfolio
              </h3>
              <p className="text-gray-700">
                Complete assignments that you can showcase in your professional
                portfolio.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                Career Growth
              </h3>
              <p className="text-gray-700">
                Develop practical skills that give you a competitive edge in the
                job market.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
        >
          <button
            onClick={handleRegister}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Register Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AssignmentMentorship;
