import { Link } from "react-router-dom";
import { Facebook, Twitter, LinkedinIcon as LinkedIn, Instagram } from 'lucide-react';

const JobPageFooter = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">URMILA's JobPortal is your gateway to exciting career opportunities. We connect talented professionals with leading companies.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/jobs" className="text-gray-400 hover:text-green-500">Find Jobs</Link></li>
              <li><Link href="/companies" className="text-gray-400 hover:text-green-500">Companies</Link></li>
              <li><Link href="/career-advice" className="text-gray-400 hover:text-green-500">Career Advice</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-green-500">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">Email: support@urmila.academy</p>
            <p className="text-gray-400">Phone: +91 83 6868 2912</p>
            <p className="text-gray-400">Address: DLF Cybercity, Gurugram (HR), India</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/1urmila" className="text-gray-400 hover:text-green-500"><LinkedIn /></a>
              <a href="#" className="text-gray-400 hover:text-green-500"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-green-500"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 URMILA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default JobPageFooter;

