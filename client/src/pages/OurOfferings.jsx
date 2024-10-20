import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";

// Mock data for enrolled and all courses
const enrolledCourses = [];

const allCourses = [
  {
    id: 1,
    title: "Certificate Course - Warehouse Solutions",
    description:
      "Learn efficient strategies for optimizing warehouse layout and operations.",
    enrolled: false,
    image: "/course1.png?height=100&width=200",
  },
  {
    id: 2,
    title: "Certificate Course - Warehouse Operations",
    description:
      "Master the key principles of effective inventory management and logistics coordination.",
    enrolled: false,
    image: "/course21.png?height=100&width=200",
  },
  {
    id: 5,
    title: "Executive Course - Logistics Management",
    description:
      "Explore the fundamentals of transportation management and logistics systems.",
    enrolled: false,
    image: "/course51.png?height=100&width=200",
  },
  {
    id: 3,
    title: "Certificate Course - Transportation",
    description:
      "Gain insights into the processes and documentation essential for freight forwarding.",
    enrolled: false,
    image: "/transport.jpg?height=100&width=200",
  },
  {
    id: 4,
    title: "Certificate Course - Freight Forwarding",
    description:
      "Enhance your leadership skills in overseeing complex logistics and supply chain operations.",
    enrolled: false,
    image: "/course3.png?height=100&width=200",
  },
];
const OurOfferings = () => {

  const {isAuthenticated} = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const filteredAllCourses = allCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white-50 pb-20 pt-6 to-white">
      <main className="container mx-auto px-4 py-8">
      

        <div className="mb-6">
          {activeTab === "all" && (
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 pt-6 lg:grid-cols-3">
          {(activeTab === "enrolled"
            ? enrolledCourses
            : filteredAllCourses
          ).map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={course.image}
                alt={course.title}
                width={200}
                height={100}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col justify-evenly">
                <h3 className="text-xl font-semibold mb-2 line-clamp-3 h-16">{course.title}</h3>
                <p className="text-gray-600 mb-4 h-12 overflow-hidden">
                  {course.description}
                </p>
                <button
                  className={`w-full py-2 rounded-md ${
                    course.enrolled
                      ? "bg-green-100 text-green-600 border border-green-600"
                      : "bg-green-600 text-white"
                  }`}

                  onClick={() => {
                    isAuthenticated 
                    ? 
                    (
                      navigate('/mycourses')
                    ) 
                    : 
                    navigate('/login')}}
                >
                  {course.enrolled ? "Continue Learning" : "Enroll Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default OurOfferings;

// import React from 'react';
// import { FaWarehouse, FaTruck, FaBoxes, FaShip, FaBriefcase } from 'react-icons/fa';

// const OurOfferings = () => {
//   return (
//     <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Our Offerings</h2>
//       <ul className="list-disc ml-6 space-y-2">
//         <li className="flex items-center">
//           <FaWarehouse className="mr-2 text-blue-500" /> Course 1: Certificate Course - Warehouse Solutions
//         </li>
//         <li className="flex items-center">
//           <FaBoxes className="mr-2 text-blue-500" /> Course 2: Certificate Course - Warehouse Operations
//         </li>
//         <li className="flex items-center">
//           <FaTruck className="mr-2 text-blue-500" /> Course 3: Certificate Course - Transportation
//         </li>
//         <li className="flex items-center">
//           <FaShip className="mr-2 text-blue-500" /> Course 4: Certificate Course - Freight Forwarding
//         </li>
//         <li className="flex items-center">
//           <FaBriefcase className="mr-2 text-blue-500" /> Course 5: Executive Course - Logistics Management
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default OurOfferings;
