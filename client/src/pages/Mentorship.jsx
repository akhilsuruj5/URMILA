import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const AssignmentMentorship = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    let token = localStorage.getItem("token");

    if (!token) {
      setError("User not found, please log in again.");
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
        try {
          const refreshResponse = await axios.post(
            "https://urmila-backend.onrender.com/refresh-token"
          );
          token = refreshResponse.data.accessToken;
          localStorage.setItem("token", token);

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

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleRegister = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setMessage(null); 

    try {
      const response = await axios.post(
        "https://urmila-backend.onrender.com/api/register/mentorship",
        { userId: user._doc._id, mentorshipType: "Assignment-Based Mentorship" }, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );


      if (response.status === 201) {
        const emailResponse = await axios.post(
          "https://urmila-backend.onrender.com/send-mentorship-email",
          {
            user: user._doc, mentorshipType: "Assignment-Based Mentorship"
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        if (emailResponse.status === 200) {
          setMessage({ type: "success", text: response.data.message });
        toast.success(response.data.message);
        } else if (response.status === 400 && response.data.error === 'You are already registered for this mentorship.') {
          setMessage({ type: "error", text: response.data.error });
          toast.info(response.data.error); 
        }
        else {
          toast.error("Failed to register for the course. Please try again.");
        }
      } else {
        toast.error("Failed to register for the course. Please try again.");
      }
    } catch (error) {
      if (error.response.status === 400 && error.response.data.error === 'You are already registered for this mentorship.') {
        setMessage({ type: "error", text: error.response.data.error });
        toast.info(error.response.data.error); 
      } else if (error.request) {
        console.log("Error request:", error.request);
        setMessage({ type: "error", text: error.response.data.error });
        toast.error(error.response.data.error); 
      }
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <ToastContainer />
      <div className="container mx-auto py-16 px-4">
        <motion.h1
          className="text-4xl font-bold text-center text-green-700 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          Assignment-Based Mentorship
        </motion.h1>

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
            {loading ? "Registering..." : "Register Now"}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AssignmentMentorship;
