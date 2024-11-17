import React from 'react';
import { IoBookOutline } from "react-icons/io5";
import { LuUsers, LuTrendingUp } from "react-icons/lu";
import { FaUserTie, FaChalkboardTeacher } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WhyThisCourse = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      title: "1 to 1 Mentorship",
      description: "Personalized mentorship to help you thrive and achieve your career goals.",
      icon: <FaUserTie className="h-12 w-12 text-green-600 mb-4" />,
      action: () => navigate('/one-on-one-mentorship'),
    },
    {
      title: "Assignment Based Mentorship",
      description: "Hands-on learning through real-world assignments for deeper understanding.",
      icon: <FaChalkboardTeacher className="h-12 w-12 text-green-600 mb-4" />,
      action: () => navigate('/mentorship'),
    },
    {
      title: "Our Courses",
      description: "Certificate courses to bridge academic learning and industry needs.",
      icon: <IoBookOutline className="h-12 w-12 text-green-600 mb-4" />,
      action: () => navigate('/ourofferings'),
    },
    {
      title: "Internship and Placement Support",
      description: "Providing skills and support for a seamless entry into the workforce.",
      icon: <LuTrendingUp className="h-12 w-12 text-green-600 mb-4" />,
      action: () => navigate('/placementsupport'),
    },
  ];

  return (
    <section className="py-32 mx-6 sm:mx-12 md:mx-24 lg:mx-40">
      <div className="container px-4">
        <h2 className="text-3xl font-bold pb-12 tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-green-600">
          Our Offerings
        </h2>
        <div className="grid pb-16 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center text-center p-6 bg-green-50 rounded-lg shadow-lg transition-transform hover:scale-105 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, amount: 0.2 }}
              onClick={benefit.action}
            >
              {benefit.icon}
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-700 mb-4">{benefit.description}</p>

              {/* Explore Button - Hidden initially, appears on hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-green-600 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    benefit.action();
                  }}
                  className="px-6 py-2 bg-white text-green-600 rounded-md font-semibold"
                >
                  Explore
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyThisCourse;
