import React from "react";
import { motion } from "framer-motion";

const InternshipSupport = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <div className="container mx-auto py-16 px-4">
        {/* Header Section */}
        <motion.h1
          className="text-4xl font-bold text-center text-green-700 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          Internship & Placement Support
        </motion.h1>

        {/* Description Section */}
        <motion.div
          className="bg-green-100 p-8 rounded-lg shadow-md max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
        >
          <p className="text-lg leading-7 mb-4">
            Our internship and placement support provide students with a
            seamless pathway from education to employment, ensuring they are
            equipped with the skills, experience, and confidence necessary for
            successful career entry and growth.
          </p>
          <p className="text-lg leading-7">
            This combination of specialized training and hands-on experience
            enhances students' readiness for industry-specific roles, making
            them highly attractive to employers.
          </p>
        </motion.div>

        {/* Program Highlights Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">
            Program Highlights
          </h2>
          <ul className="list-disc pl-6 max-w-3xl mx-auto text-lg leading-7 space-y-3">
            <li>Personalized career counseling and resume building.</li>
            <li>Access to industry-specific internship opportunities.</li>
            <li>Mock interviews to enhance communication skills.</li>
            <li>Networking opportunities with industry professionals.</li>
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
                Real-World Experience
              </h3>
              <p className="text-gray-700">
                Gain practical knowledge and industry experience through
                internships.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                Career Guidance
              </h3>
              <p className="text-gray-700">
                Benefit from personalized mentorship and career counseling.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                Job Readiness
              </h3>
              <p className="text-gray-700">
                Enhance your skills with mock interviews and resume reviews.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                Industry Connections
              </h3>
              <p className="text-gray-700">
                Build networks with professionals and gain valuable
                recommendations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Job Portal Button Section */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
        >
          <a
            href="/jobs"
            className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-green-800 transition-colors"
          >
            Visit Job Portal
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default InternshipSupport;
