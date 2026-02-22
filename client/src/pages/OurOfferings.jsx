import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";

// Mock data for enrolled and all courses
const enrolledCourses = [];

// const allCourses = [
//   {
//     id: 1,
//     title: "Intensive Certificate Course: Warehouse Solutions",
//     description:
//       "Design and optimize warehouses, enhance productivity, and create scalable, cost-effective solutions for efficient operations.",
//     enrolled: false,
//     image: "/course1.png?height=100&width=200",
//   },
//   {
//     id: 2,
//     title: "Intensive Certificate Course: Warehouse Operations",
//     description:
//       "Learn warehouse management, improve efficiency, and develop strategic skills for optimizing operations.",
//     enrolled: false,
//     image: "/course21.png?height=100&width=200",
//   },
//   {
//     id: 5,
//     title: "Intensive Certificate Course: Transport Operations",
//     description:
//       "Master strategies and processes for efficient, cost-effective transport within supply chains.",
//     enrolled: false,
//     image: "/course51.png?height=100&width=200",
//   },
//   {
//     id: 3,
//     title: "Intensive Certificate Course: Freight Forwarding",
//     description:
//       "Understand logistics, documentation, and regulations for managing goods movement globally.",
//     enrolled: false,
//     image: "/transport.jpg?height=100&width=200",
//   },
//   {
//     id: 4,
//     title: "Executive Course: Logistics Management",
//     description:
//       "Develop advanced skills in logistics, covering warehouses, transportation, and supply chains.",
//     enrolled: false,
//     image: "/course3.png?height=100&width=200",
//   },
// ];

const OurOfferings = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [allCourses, setAllCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch courses from the database
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://urmila-webservice.onrender.com/api/courses");
        const data = await response.json();
        setAllCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const filteredAllCourses = (allCourses || []).filter((course) =>
    course?.title?.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="container mx-auto px-6 lg:px-20 pt-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
            {(activeTab === "enrolled" ? enrolledCourses : filteredAllCourses).map(
              (course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm "
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    width={200}
                    height={100}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 min-h-[250px] flex flex-col justify-between space-y-4">

                    <h3 className="text-lg font-semibold line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-6 line-clamp-6">
                      {course.description}
                    </p>
                    <button
                      className={`w-full py-2 mt-2 rounded-md ${course.enrolled
                        ? "bg-green-100 text-green-600 border border-green-600"
                        : "bg-green-600 text-white"
                        }`}
                      onClick={() =>
                        isAuthenticated ? navigate("/mycourses") : navigate("/login")
                      }
                    >
                      {course.enrolled ? "Continue Learning" : "Enroll Now"}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OurOfferings;
