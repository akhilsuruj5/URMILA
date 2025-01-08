import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TestimonialForm = ({ courses }) => {
  const [formData, setFormData] = useState({
    name: "",
    linkedin: "",
    text: "",
    photo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://urmila-webservice.onrender.com/api/testimonials", formData);
      toast.success(response.data.message);
      setFormData({
        name: "",
        linkedin: "",
        text: "",
        photo: null,
      });

      e.target.reset();
  
    } catch (error) {
      toast.error("Failed to submit testimonial");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-10">
      <p className="text-sm text-gray-600 mb-4">
        *Please provide a valid image URL for your photo.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn Profile
          </label>
          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn URL"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Testimonial
          </label>
          <textarea
            name="text"
            placeholder="Write your feedback here (max 400 characters)..."
            onChange={(e) =>
              setFormData({ ...formData, text: e.target.value.slice(0, 400) })
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            name="photo"
            placeholder="Enter Image URL"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
        >
          Submit Testimonial
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
