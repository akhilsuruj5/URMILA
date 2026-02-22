import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle, Users } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function MentorshipPage() {
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
        "https://urmila-webservice.onrender.com/user",
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
            "https://urmila-webservice.onrender.com/refresh-token"
          );
          token = refreshResponse.data.accessToken;
          localStorage.setItem("token", token);

          const retryResponse = await axios.get(
            "https://urmila-webservice.onrender.com/user",
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

  const handleRegister = async (mentorshipType) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post(
        "https://urmila-webservice.onrender.com/api/register/mentorship",
        { userId: user._doc._id, mentorshipType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        const emailResponse = await axios.post(
          "https://urmila-webservice.onrender.com/send-mentorship-email",
          {
            user: user._doc, mentorshipType
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            One-to-One Mentorship Program
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Unlock your potential with personalized guidance
          </p>
        </header>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 mb-8 md:mb-12">
          <InfoCard title="Program Details" items={programDetails} />
          <InfoCard title="Benefits" items={whyChooseUs} />
        </div>

        <div className="text-center">
          <Button onClick={() => handleRegister("One-to-One Mentorship Program")}>
            {loading ? "Registering..." : "Register Now"}
          </Button>
          {message && (
            <div
              className={`mt-4 text-lg ${message.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
                }`}
            >
              {message.text}
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Join Our Growing Community
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 text-green-600">
            <Users className="h-6 w-6" />
            <span className="text-lg sm:text-xl font-medium">
              20+ Mentees Empowered
            </span>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

function InfoCard({ title, items }) {
  return (
    <Card>
      <CardContent>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          {title}
        </h2>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-1 flex-shrink-0" />
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function Card({ children }) {
  return (
    <div className="bg-green-50 shadow-lg rounded-lg overflow-hidden border border-green-200">
      {children}
    </div>
  );
}

function CardContent({ children }) {
  return <div className="p-4 sm:p-6">{children}</div>;
}

function Button({ children, onClick, disabled }) {
  return (
    <button
      className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full text-base sm:text-lg transition duration-300 ease-in-out transform ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
        }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

const programDetails = [
  "Personalized 1:1 sessions with expert mentors",
  "Flexible scheduling to fit your needs",
  "Goal-oriented approach for measurable progress",
  "Access to exclusive resources and workshops",
];

const whyChooseUs = [
  "Experienced mentors from top industries",
  "Tailored guidance for your career path",
  "Proven track record of mentee success",
  "Supportive community of like-minded individuals",
];
