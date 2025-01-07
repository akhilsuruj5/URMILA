import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuMapPin, LuPhone, LuGlobe, LuMail } from "react-icons/lu";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12">
      <div className="mx-6 md:mx-20 lg:mx-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Unified Resource Management Institute for Logistics and Analytics (URMILA)
            </h3>
            <p className="text-gray-400">
              We offer cutting-edge supply chain management courses to help professionals excel in their careers.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="text-gray-400 hover:text-white transition-colors">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ourofferings')} className="text-gray-400 hover:text-white transition-colors">
                  Our Offerings
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contactus')} className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/recruiter')} className="text-gray-400 hover:text-white transition-colors">
                  Recruiter Login
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/browsejobs')} className="text-gray-400 hover:text-white transition-colors">
                  Job Search
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <LuMapPin className="h-5 w-5 mr-2 text-green-500" />
                <span className="text-gray-400">DLF Cybercity, Gurugram (HR), India</span>
              </li>
              <li className="flex items-center">
                <LuPhone className="h-5 w-5 mr-2 text-green-500" />
                <span className="text-gray-400">+91 83 6868 2912</span>
              </li>
              <li className="flex items-center">
                <LuMail className="h-5 w-5 mr-2 text-green-500" />
                <a href="mailto:support@urmila.academy" className="text-gray-400 hover:text-white transition-colors">
                  support@urmila.academy
                </a>
              </li>
              <li className="flex items-center">
                <LuGlobe className="h-5 w-5 mr-2 text-green-500" />
                <a href="https://www.urmila.academy" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  www.urmila.academy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">© 2024 URMILA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
