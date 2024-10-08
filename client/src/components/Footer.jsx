import React from 'react';
import { Link } from 'react-router-dom';
import { LuMapPin } from "react-icons/lu";
import { LuPhone } from "react-icons/lu";
import { LuGlobe } from "react-icons/lu";
import { LuMail } from "react-icons/lu";
const Footer = () => {
  return (
<footer className="bg-gray-900 text-white py-12">
        <div className=" mx-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                URMILA offers cutting-edge supply chain management courses to help professionals excel in their careers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</Link></li>
                <li><Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <LuMapPin className="h-5 w-5 mr-2 text-green-500" />
                  <span className="text-gray-400">Address.....</span>
                </li>
                <li className="flex items-center">
                  <LuPhone className="h-5 w-5 mr-2 text-green-500" />
                  <span className="text-gray-400">+ (91) 12345-45678</span>
                </li>
                <li className="flex items-center">
                  <LuMail className="h-5 w-5 mr-2 text-green-500" />
                  <span className="text-gray-400">info@urmila.com</span>
                </li>
                <li className="flex items-center">
                  <LuGlobe className="h-5 w-5 mr-2 text-green-500" />
                  <span className="text-gray-400">www.urmila.com</span>
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
