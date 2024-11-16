import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MainSection = () => {
  return (
    <section
      className="relative h-[550px] bg-cover bg-center py-20"
      style={{ backgroundImage: `url('/HeroImage.jpg')` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative container mx-auto flex flex-col justify-center h-full text-center px-4 sm:px-8">
        <div className="mx-auto text-white">
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 pb-6 md:pb-10 leading-tight">
              Master Supply Chain Management
            </h1>
          </motion.h1>
          <p className="text-lg sm:text-xl md:text-xl mb-8 sm:mb-12 md:mb-20 max-w-lg md:max-w-3xl mx-auto">
            Immerse yourself in a hands-on, project-based program designed to equip you with the skills needed to excel in the competitive supply chain management industry.
          </p>
          <Link
            to="/ourofferings"
            className="bg-green-600 text-white py-3 px-6 text-sm sm:text-md md:text-lg rounded-md"
          >
            Explore Certificate Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
