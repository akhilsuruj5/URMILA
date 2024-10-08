import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/forgot-password", { email });
      setMessage(response.data.msg);
      setError("");
    } catch (err) {
      setError(err.response?.data?.msg || "Error requesting password reset");
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center pt-32 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <label className="block mb-2 font-medium" htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600 transition duration-200"
        >
          Request Password Reset
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
