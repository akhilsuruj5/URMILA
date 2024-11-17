import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
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

// const MyCourses = () => {

// const MyCourses = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold">Welcome, {user.name}!</h1>
//       <p className="text-gray-600">Your Email: {user.email}</p>

//       <h2 className="mt-6 text-lg font-semibold">Your Courses</h2>
//       <ul className="list-disc ml-6">
//         {/* <li> */}
//           {/* </li> */}
//       </ul>
//     </div>
//   );
// };

const MyCourses = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const [isLoading, setIsLoading] = useState(false);
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
        if (error.response && error.response.status === 401) {
          // Token might have expired, try refreshing it
          try {
            const refreshResponse = await axios.post(
              "https://urmila-backend.onrender.com/refresh-token"
            );
            token = refreshResponse.data.accessToken;
            localStorage.setItem("token", token);

            // Retry fetching user data
            const retryResponse = await axios.get(
              "https://urmila-backend.onrender.com/user",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setUser(retryResponse.data);
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            setError("Session expired, please log in again.");
            toast.error("Session expired, please log in again.");
            localStorage.removeItem("token");
          }
        } else {
          setError("Error fetching user details");
          toast.error("Error fetching user details");
        }
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div className="text-center py-10 text-xl">{error}</div>;
  }

  if (!user) {
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

  const filteredAllCourses = allCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = async (courseId, title) => {
    setIsLoading(true);
    const userData = {
      name: user._doc.name,
      email: user._doc.email,
      phone: user._doc.phone,
      occupation: user._doc.occupation,
      institution: user._doc.institution,
      title: title,
    };
    let token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://urmila-backend.onrender.com/send-email",
        {
          userData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(
          "Enrollment initiated! A confirmation email has been sent."
        );
      }
      setIsLoading(false);
      navigate("/enrollment-confirmed");
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast.error("Failed to enroll. Please try again.");
    }
  };

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
  return (
    <div className="min-h-screen bg-gradient-to-b from-white pb-20 pt-6 to-white">
      <ToastContainer />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          {/* <motion.h1
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    > */}
          <h2 className="text-3xl font-bold mb-4">
            Welcome back, {user._doc.name} !
          </h2>
          {/* </motion.h1> */}
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
              <div className="p-4 min-h-[250px] flex flex-col justify-between space-y-4">

                <h3 className="text-lg font-semibold line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-700 text-sm leading-6 line-clamp-6 text-justify">
  {course.description}
</p>


                <button
                  className={`w-full py-2 rounded-md ${
                    course.enrolled
                      ? "bg-green-100 text-green-600 border border-green-600"
                      : "bg-green-600 text-white"
                  }`}
                  onClick={() => {
                    handleEnroll(course.id, course.title);
                  }}
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

export default MyCourses;

// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { BookOpen, Search, User } from "lucide-react"
// import Image from "next/image"

// // Mock data for enrolled and all courses
// const enrolledCourses = [
//   { id: 1, title: "Supply Chain Fundamentals", progress: 60, image: "/placeholder.svg?height=100&width=200" },
//   { id: 2, title: "Logistics Management", progress: 30, image: "/placeholder.svg?height=100&width=200" },
//   { id: 3, title: "Inventory Optimization", progress: 80, image: "/placeholder.svg?height=100&width=200" },
// ]

// const allCourses = [
//   { id: 1, title: "Supply Chain Fundamentals", enrolled: true, image: "/placeholder.svg?height=100&width=200" },
//   { id: 2, title: "Logistics Management", enrolled: true, image: "/placeholder.svg?height=100&width=200" },
//   { id: 3, title: "Inventory Optimization", enrolled: true, image: "/placeholder.svg?height=100&width=200" },
//   { id: 4, title: "Procurement Strategies", enrolled: false, image: "/placeholder.svg?height=100&width=200" },
//   { id: 5, title: "Sustainable Supply Chains", enrolled: false, image: "/placeholder.svg?height=100&width=200" },
//   { id: 6, title: "Supply Chain Analytics", enrolled: false, image: "/placeholder.svg?height=100&width=200" },
// ]

// export default function MyCourses() {
//   const [searchTerm, setSearchTerm] = useState("")

//   const filteredAllCourses = allCourses.filter(course =>
//     course.title.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
//       <header className="bg-white shadow-md py-4">
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-green-600">SCM Pro Learning</h1>
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" className="text-green-600">
//               <User className="mr-2 h-4 w-4" /> Profile
//             </Button>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold mb-4">Welcome back, Learner!</h2>
//           <p className="text-xl text-gray-600">Ready to continue your supply chain management journey?</p>
//         </section>

//         <Tabs defaultValue="enrolled" className="space-y-4">
//           <TabsList>
//             <TabsTrigger value="enrolled">My Enrolled Courses</TabsTrigger>
//             <TabsTrigger value="all">All Courses</TabsTrigger>
//           </TabsList>
//           <TabsContent value="enrolled">
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {enrolledCourses.map(course => (
//                 <Card key={course.id}>
//                   <CardHeader>
//                     <Image src={course.image} alt={course.title} width={200} height={100} className="rounded-t-lg" />
//                   </CardHeader>
//                   <CardContent>
//                     <CardTitle>{course.title}</CardTitle>
//                     <CardDescription>Progress: {course.progress}%</CardDescription>
//                     <div className="mt-2 h-2 bg-gray-200 rounded-full">
//                       <div
//                         className="h-full bg-green-500 rounded-full"
//                         style={{ width: `${course.progress}%` }}
//                       ></div>
//                     </div>
//                   </CardContent>
//                   <CardFooter>
//                     <Button className="w-full">Continue Learning</Button>
//                   </CardFooter>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>
//           <TabsContent value="all">
//             <div className="mb-6">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <Input
//                   type="search"
//                   placeholder="Search courses..."
//                   className="pl-10"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {filteredAllCourses.map(course => (
//                 <Card key={course.id}>
//                   <CardHeader>
//                     <Image src={course.image} alt={course.title} width={200} height={100} className="rounded-t-lg" />
//                   </CardHeader>
//                   <CardContent>
//                     <CardTitle>{course.title}</CardTitle>
//                     <CardDescription>
//                       {course.enrolled ? "Enrolled" : "Not Enrolled"}
//                     </CardDescription>
//                   </CardContent>
//                   <CardFooter>
//                     <Button className="w-full" variant={course.enrolled ? "outline" : "default"}>
//                       {course.enrolled ? "Continue Learning" : "Enroll Now"}
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>
//         </Tabs>
//       </main>

//       <footer className="bg-gray-100 py-6 mt-12">
//         <div className="container mx-auto px-4 text-center">
//           <p className="text-gray-600">&copy; 2024 SCM Pro Learning. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   )
// }
