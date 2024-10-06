import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8 text-center">
      <div className="container mx-auto">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
        <Link to='/contact' className='block text-blue-500 mt-4'>
          Contact Us
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
