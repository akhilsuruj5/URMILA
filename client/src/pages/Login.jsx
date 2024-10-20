import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/mycourses");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loader to true when request starts

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const { token, msg } = response.data;

      localStorage.setItem("token", token);
      login(token);
      setError("");

      // Toast notification on successful login
      toast.success("Login successful! Redirecting to My Courses...");

      setLoading(false); // Stop loader
      navigate("/mycourses");
    } catch (err) {
      const errorMessage = err.response?.data?.msg || "Error logging in";
      setError(errorMessage);
      setLoading(false); // Stop loader when there's an error

      // Toast notification on error
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-end h-screen pr-36">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
      <div className="w-full max-w-md pt-28 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-blue-500"
              disabled={loading} // Disable the button while loading
            >
              {loading ? "Logging in..." : "Login"} {/* Show loader text */}
            </button>
          </div>

          {loading && (
            <div className="text-center mt-4">
              {/* Loader Spinner */}
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p>Processing your login...</p>
            </div>
          )}

          <p className="text-center mt-4">
            New User?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Signup
            </a>
          </p>

          <p className="text-center mt-4">
            <a href="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
