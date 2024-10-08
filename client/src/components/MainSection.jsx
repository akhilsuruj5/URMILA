import React from 'react';
import { Link } from 'react-router-dom';

const MainSection = () => {
  return (
    <section 
      className="relative h-[610px] bg-cover bg-center py-24"
      style={{ backgroundImage: `url('/HeroImage.jpg')` }} 
    >
      <div className="absolute inset-0 bg-black opacity-60 "></div> 

      <div className="relative container mx-auto flex flex-col md:flex-row justify-between h-full">
        <div className="max-w-lg text-white">
          <h1 className="text-5xl pb-4 font-bold mb-4">Master Supply Chain Management</h1>
          <p className="text-lg mb-6">
            Immerse yourself in a hands-on, project-based program designed to equip you with the skills needed to excel in the competitive supply chain management industry.
          </p>
          <p className="text-md mb-12">Master the Fundamentals: Logistics, Operations, Planning, Sourcing, and Strategy</p>
          <Link to="/register" className="bg-green-600 text-white py-3 px-6 text-md rounded-md">Register</Link>
        </div>
        
      </div>
    </section>
  );
};

export default MainSection;
