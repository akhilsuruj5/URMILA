import React from 'react';
import { Link } from 'react-router-dom';

const MainSection = () => {
  return (
<section 
      className="relative h-[610px] bg-cover bg-center py-24"
      style={{ backgroundImage: `url('/HeroImage.jpg')` }} 
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> 

      <div className="relative container mx-auto flex flex-col justify-center h-full text-center">
        <div className="mx-auto text-white">
          <h1 className="text-6xl font-bold mb-4 pb-10">Master Supply Chain Management</h1>
          <p className="text-xl mb-20 max-w-3xl mx-auto">
            Immerse yourself in a hands-on, project-based program designed to equip you with the skills needed to excel in the competitive supply chain management industry.
          </p>  
          {/* <p className="text-md mb-12">Master the Fundamentals: Logistics, Operations, Planning, Sourcing, and Strategy</p> */}
          <Link to="/ourofferings" className="bg-green-600 text-white py-3 px-6 text-md rounded-md">Explore Courses</Link>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
