import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';



const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <div className='flex justify-between shadow-lg items-center p-5 pl-24 text-lg pt-3 pb-3'>
      <div>
                <Link to='/'>
                    <img src='/logo.jpeg' alt='Logo' className='h-[55px]' /> 
                </Link>
            </div>
      <nav>
        <ul className='flex flex-row items-center space-x-12 pr-10 font-medium'>
          <li><Link to='/about'>About Us</Link></li>
          <li><Link to='/ourofferings'>Our Offerings</Link></li>

          {isAuthenticated ? (
            <>
              <li><Link to='/mycourses'>My Courses</Link></li>
              <li><Link to='/profile'>Profile</Link></li>
              <li>
                <button onClick={handleLogout} className='bg-black text-white px-4 py-3 rounded-md text-sm'>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to='/login'>Login</Link></li>
              <li>
                <Link to='/signup' className='bg-green-500 text-white px-4 py-3 rounded-md text-sm'>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
