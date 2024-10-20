import React from 'react'
import { FaCheckCircle, FaPhone, FaEnvelope, FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router'

export default function EnrollmentConfirmation() {

    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <button onClick={() => navigate('/')} className="text-green-600 hover:text-green-800 transition-colors flex items-center">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </button>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Enrollment Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for enrolling in our course. Our team will contact you shortly to guide you through the next steps.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">What's Next?</h2>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-start">
                <FaPhone className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Expect a call from our team within 24-48 hours.</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Check your email for important course information.</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <button onClick={() => navigate('/ourofferings')} className="block w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors">
              Browse More Courses
            </button>
            <button onClick={() => navigate('/mycourses')} className="block w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors">
              Go to My Dashboard
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; URMILA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}