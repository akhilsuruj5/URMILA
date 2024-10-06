import React from 'react';
import { Link } from 'react-router-dom';

const MainSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto flex items-center justify-between">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Master Supply Chain Management</h1>
          <p className="text-lg text-gray-700 mb-6">
            Immerse yourself in a hands-on, project-based program designed to equip you with the skills needed to excel in the competitive supply chain management industry.
          </p>
          <p className="text-sm text-gray-600 mb-4">Master the Fundamentals: Logistics, Operations, Planning, Sourcing, and Strategy</p>
          <Link to="/register" className="bg-green-600 text-white py-3 px-6 rounded-md">Register</Link>
        </div>
        <img src="path-to-image.png" alt="Supply Chain Management" className="w-1/2"/>
      </div>
    </section>
  );
};

export default MainSection;
