import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiMessageSquare, FiSend, FiPhone, FiMapPin } from 'react-icons/fi'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated API call to submit the form
    console.log('Submitting form:', formData)
    alert('Thank you for your message. We will get back to you soon!')
    setFormData({ name: '', email: '', message: '' }) // Reset form after submission
  }

  return (
    <div className=" min-h-screen pt-10 container mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg p-6 w-full max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        <div className="pt-10 grid md:grid-cols-2 gap-52">
          <div>
            <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiSend className="mr-2" />
                Send Message
              </motion.button>
            </form>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <FiPhone className="mt-1 mr-3 text-blue-500" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p>+1 (123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiMail className="mt-1 mr-3 text-blue-500" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p>contact@example.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiMapPin className="mt-1 mr-3 text-blue-500" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p>123 Education Street, Learning City, 12345, Country</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p>Saturday: 10:00 AM - 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}