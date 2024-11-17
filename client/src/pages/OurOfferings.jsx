import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";

// Mock data for enrolled and all courses
const enrolledCourses = [];

const allCourses = [
  {
    id: 1,
    title: "Intensive Certificate Course : Warehouse Solutions",
    description:
      "Our certificate course on Warehouse Solutions provides in-depth training on the planning, layout, and operational optimization of modern warehouses. This course is designed to equip participants with the skills to create efficient, scalable warehouse solutions that enhance productivity and reduce costs while fulfilling operational requirements.",
    enrolled: false,
    image: "/course1.png?height=100&width=200",
  },
  {
    id: 2,
    title: "Intensive Certificate Course : Warehouse Operations",
    description:
      "Our certificate course on Warehouse Operations provides essential training in the day-to-day management and optimization of warehouse processes, aimed at improving efficiency, accuracy, and productivity. Participants gain a comprehensive understanding of the operational and strategic aspects required to manage modern warehouses effectively.",
    enrolled: false,
    image: "/course21.png?height=100&width=200",
  },
  {
    id: 5,
    title: "Intensive Certificate Course : Transport Operations",
    description:
      "Our certificate course on Transport Operations provides foundational knowledge and practical skills for managing and optimizing transportation within supply chains. The course covers the key processes, technologies, and strategies needed to ensure timely, cost-effective, and efficient movement of goods.",
    enrolled: false,
    image: "/course51.png?height=100&width=200",
  },
  {
    id: 3,
    title: "Intensive Certificate Course : Freight Forwarding",
    description:
      "Our certificate course on Freight Forwarding provides essential knowledge and skills for managing the movement of goods across international and domestic supply chains. It covers the end-to-end process of freight forwarding, focusing on logistics, documentation, regulations, and the various modes of transportation.",
    enrolled: false,
    image: "/transport.jpg?height=100&width=200",
  },
  {
    id: 4,
    title: "Executive Course : Logistics Management",
    description:
      "Our executive Course in Logistics Management is designed for professionals looking to enhance their strategic understanding and operational skills across all aspects of logistics, including warehouse solutions, transportation, freight forwarding, and supply chain management. The course covers both foundational and advanced topics, equipping participants with the knowledge to manage and optimize complex logistics operations.",
    enrolled: false,
    image: "/course3.png?height=100&width=200",
  },
];

const OurOfferings = () => {
  const { isAuthenticated } = useAuth();
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
          {(activeTab === "enrolled" ? enrolledCourses : filteredAllCourses).map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md">
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
<p className="text-gray-700 text-sm leading-6 line-clamp-6 text-justify">
{course.description}
</p>
                <button
                  className={`w-full py-2 mt-2 rounded-md ${
                    course.enrolled
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
      </main>
    </div>
  );
};

export default OurOfferings;
