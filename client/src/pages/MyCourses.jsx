import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import TestimonialForm from "../components/TestimonialForm";

const MyCourses = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [allCourses, setAllCourses] = useState([]); // State for all courses
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true); 
  const [enrolledCourses, setEnrolledCourses] = useState([]);
// Set initial loading state to true
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      let token = localStorage.getItem("token");

      if (!token) {
        setError("User not found, please log in again.");
        toast.error("User not found, please log in again.");
        return;
      }

      try {
        const response = await axios.get(
          "https://urmila-backend.onrender.com/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Please Login again");
        setError("Error fetching user details");
      }
    };

    fetchUserData();
  }, []);


  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      let token = localStorage.getItem("token");
      if (!token || !user) return; // Ensure user exists before proceeding
  
  try {
    const response = await axios.get(
      `https://urmila-backend.onrender.com/api/registrations/enrolled?userId=${user._doc._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    if (Array.isArray(response.data)) {
      setEnrolledCourses(response.data); // Update state with fetched courses
    } else {
      console.error('Unexpected response format:', response.data);
      toast.error('Unexpected response from the server');
    }
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    toast.error('Error fetching enrolled courses');
  }
  
    };
  
    if (activeTab === "enrolled") {
      fetchEnrolledCourses(); // Fetch enrolled courses only when the "Enrolled" tab is clicked
    }
  }, [activeTab, user]); // Run this effect when `activeTab` or `user` changes
  
  
  
  // Fetch all courses
  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const response = await axios.get(
          "https://urmila-backend.onrender.com/api/courses" // Update with your API URL
        );
        setAllCourses(response.data); // Assign fetched courses to the state
        setIsLoading(false); // Mark loading as complete
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Error fetching courses");
        setIsLoading(false); // Stop loading even if there is an error
      }
    };

    fetchAllCourses();
  }, []);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return <div className="text-center py-10 text-xl">{error}</div>;
  }

  // Filter courses based on search term
  const filteredAllCourses = allCourses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white pb-20 pt-6 to-white">
      <ToastContainer />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Welcome back, {user?._doc.name}!
          </h2>
          <p className="text-xl text-gray-600">
            Ready to continue your supply chain management journey?
          </p>
        </section>

        <div className="mb-6">
  <div className="flex space-x-4 mb-6">
    <button
      className={`px-4 py-2 rounded-md ${
        activeTab === "enrolled"
          ? "bg-green-600 text-white"
          : "bg-gray-200 text-gray-700"
      }`}
      onClick={() => setActiveTab("enrolled")}
    >
      My Enrolled Courses
    </button>
    <button
      className={`px-4 py-2 rounded-md ${
        activeTab === "all"
          ? "bg-green-600 text-white"
          : "bg-gray-200 text-gray-700"
      }`}
      onClick={() => setActiveTab("all")}
    >
      All Courses
    </button>
  </div>
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

<div className="container mx-auto px-6 lg:px-20 pt-6">
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {(activeTab === "enrolled" ? enrolledCourses : filteredAllCourses).map((course) => {
      const courseData = activeTab === "enrolled" ? course.offering : course; // Handle nested `offering` for enrolled courses
      return (
        <div
          key={courseData._id}
          className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm"
        >
          <img
            src={courseData.image || "default-course-image.jpg"}
            alt={courseData.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4 min-h-[150px] flex flex-col justify-between space-y-4">
            <h3 className="text-lg font-semibold line-clamp-2">
              {courseData.name}
            </h3>
            <p className="text-gray-700 text-sm leading-5 line-clamp-2">
              {courseData.description}
            </p>
            
            {
              activeTab === "enrolled" ? (
                <>
                  {courseData.studyMaterialLink ? (
                    <a
                      href={courseData.studyMaterialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                      
                    >
                      <button className="w-full py-2 rounded-md bg-green-600 text-white" disabled>
                        Download Study Material
                      </button>
                    </a>
                  ) : (
                    <button
                      className="w-full py-2 rounded-md bg-gray-400 text-white cursor-not-allowed"
                      disabled
                    >
                      Study Material Not Available
                    </button>
                  )}
                  <button className="w-full py-2 rounded-md bg-green-600 text-white">
                    Start Course
                  </button>
                </>
              ) : (
                <button
                  className="w-full py-2 rounded-md bg-green-600 text-white"
                  onClick={() => handleEnroll(courseData._id)}
                >
                  Explore
                </button>
              )
            }
            
            
          </div>
        </div>
      );
    })}
  </div>
  
  {/* Show Testimonial Form if enrolled in at least one course */}
  {activeTab === "enrolled" && enrolledCourses.length > 0 && (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Share Your Experience</h3>
      <TestimonialForm courses={enrolledCourses.map((c) => c.offering)} />
    </div>
  )}
</div>


      </main>

      {/* <TestimonialForm courses={allCourses}/> */}
    </div>
  );
};

export default MyCourses;
