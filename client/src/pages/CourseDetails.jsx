import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const CourseDetails = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      console.log(courseId, "coursesdnfjikd");
      try {
        const response = await axios.get(
          `https://urmila-backend.onrender.com/api/courses/${courseId}`
        );
        setCourse(response.data); 
      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error("Failed to load course details.");
        navigate("/courses");
      }
    };

    fetchCourseDetails();
  }, [courseId, navigate]);

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

  const handleRegister = async () => {
    setIsLoading(true);
  
    // console.log(course);
    if (course.name === undefined) {
      toast.error("Course details not loaded. Please try again.");
      setIsLoading(false);
      return;
    }
    console.log(user)
    const userData = {
      userId: user._doc._id,
      courseId: courseId,
      name: user._doc.name,
      email: user._doc.email,
      phone: user._doc.phone,
      occupation: user._doc.occupation,
      institution: user._doc.institution,
      title: course.name,
    };
  
    let token = localStorage.getItem("token");
  
    try {
      const registrationResponse = await axios.post(
        "https://urmila-backend.onrender.com/api/register/course",
        {
          userId: userData.userId,
          courseId: userData.courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (registrationResponse.status === 201) {
        const emailResponse = await axios.post(
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
  
        if (emailResponse.status === 200) {
          toast.success(
            "Enrollment initiated! A confirmation email has been sent."
          );
          navigate("/enrollment-confirmed");
        } else {
          toast.error("Failed to send confirmation email.");
        }
      } else {
        toast.error("Failed to register for the course. Please try again.");
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
  
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "You are already registered for this course."
      ) {
        toast.info("You are already registered for this course.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  if (!course) return null;

  return (
    <div className="min-h-screen">
  <ToastContainer />
  <div className="bg-white">
    <div className="mb-10">
      {course.image ? (
        <img
          src={course.image}
          alt={course.title}
          className="w-full max-h-80 object-cover"
        />
      ) : (
        <div className="w-full max-h-60 bg-gray-200 flex items-center justify-center rounded-md text-gray-500">
          Image Unavailable
        </div>
      )}
    </div>

    <h1 className="text-2xl md:text-3xl font-bold mb-4 px-4 md:px-8 lg:pl-32 text-gray-800">
      {course.name}
    </h1>

    <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6 px-4 md:px-8 lg:px-32 lg:pr-60">
      {course.description}
    </p>

    <div className="px-4 md:px-8 lg:px-32">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
        Table of Content
      </h2>
      {course.tableOfContent && course.tableOfContent.length > 0 ? (
        <ul className="list-disc pl-6 text-gray-700 leading-6">
          {course.tableOfContent.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No content available.</p>
      )}
    </div>

    <div className="px-4 md:px-8 lg:pl-32 mt-6 flex justify-center lg:justify-start">
      <button
        className={`w-full md:w-auto px-6 md:px-12 py-3 text-sm rounded-md ${
          isLoading
            ? "bg-gray-400 text-white"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
        onClick={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </div>
  </div>
</div>

  );
};

export default CourseDetails;
