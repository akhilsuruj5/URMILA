import React from 'react'
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa'
const AboutUs = () => {
  const companyName = "Unified Resource Management Institute for Logistics and Analytics (URMILA)";
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 pb-20 pt-6 to-white">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 max-w-3xl mx-auto">{companyName}</h1>

        <div className="bg-white rounded-lg shadow-lg max-w-6xl mx-auto pt-10 pb-10 overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Company Image"
                width={600}
                height={400}
                className="h-full w-full object-cover md:w-48"
              />
            </div>
            <div className="p-8">
              <h2 className="block mt-1 text-2xl leading-tight font-bold text-gray-900 mb-4">About Our Company</h2>
              <p className="mt-2 text-gray-600">
              In 2018, we started bridging the gap between Academia and Logistics Industry expectations in terms of talent quality after realizing talent gaps. We started grooming fresh college graduates through mentorships and various internship programs. Our mission is to groom college graduates through mentorships and support them in getting live projects/internships for hands-on experience. We believe that our initiatives make college graduates employable and support the world in getting future leaders in the Logistics industry.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: 'Akhilesh Kushawaha', role: 'CEO' },
              { name: 'Name', role: 'Head of Operations' },
              { name: 'Name', role: 'Lead Data Scientist' },
              { name: 'Name', role: 'Customer Success Manager' },
              { name: 'Name', role: 'Senior Supply Chain Analyst' },
              { name: 'Name', role: 'UX/UI Designer' },
              { name: 'Name', role: 'Marketing Director' }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <img
                    src={`/testimonial.jpg?height=96&width=96`}
                    alt={`${member.name} Image`}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center">{member.name}</h3>
                <p className="text-gray-600 text-center text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center pt-10 pb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Connect With Us</h2>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <FaFacebook size={24} />
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AboutUs