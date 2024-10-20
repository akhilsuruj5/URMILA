import React from 'react';
import { IoBookOutline } from "react-icons/io5";
import { LuUsers, LuTrendingUp } from "react-icons/lu";
import { motion } from 'framer-motion'; // Import motion from framer-motion

const WhyThisCourse = () => {
  const benefits = [
    { title: "Mentorship", description: "Benefit from one-on-one guidance from industry professionals.", icon: <LuUsers className="h-12 w-12 text-green-600 mb-4" /> },
    { title: "Placement Assistance", description: "Get placement assistance to land a great job.", icon: <LuTrendingUp className="h-12 w-12 text-green-600 mb-4" /> },
    { title: "Flexible Learning", description: "Learn at your own pace with flexible schedules.", icon: <IoBookOutline className="h-12 w-12 text-green-600 mb-4" /> },
  ];

  return (
    <section className="py-32 mx-40">
      <div className="container px-4">
        <h2 className="text-3xl font-bold pb-12 tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-green-600">
          Why This Course?
        </h2>
        <div className="grid pb-16 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-green-50 rounded-lg shadow-lg transition-transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }} // Initial state for animation
              whileInView={{ opacity: 1, y: 0 }} // State when in view
              transition={{ duration: 0.5 }} // Duration of the animation
              viewport={{ once: false, amount: 0.2 }} // Trigger when 20% of the component is visible
            >
              {benefit.icon}
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-700">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyThisCourse;
