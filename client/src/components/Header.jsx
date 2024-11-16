import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 flex justify-between items-center p-4 md:p-3 md:pl-24 text-lg">
      {/* Logo Section */}
      <div>
        <Link to="/">
          <div className="flex flex-row items-center gap-2 md:gap-4">
            <img src="/logo.jpeg" alt="Logo" className="h-10 md:h-[50px]" />
            <span className="text-2xl md:text-4xl font-semibold text-gray-800">URMILA</span>
          </div>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex flex-row items-center space-x-4 md:space-x-12 pr-2 md:pr-10 font-medium text-base md:text-xl">
          <li><Link to="/about">About Us</Link></li>
          {!isAuthenticated && <li><Link to="/ourofferings">Our Courses</Link></li>}
          {isAuthenticated ? (
            <>
              <li><Link to="/mycourses">My Courses</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-green-600 text-white px-4 py-2 md:px-5 md:py-3 rounded-md text-sm md:text-md"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/contactus">Contact Us</Link></li>
              <li>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white px-4 py-2 md:px-5 md:py-4 rounded-md text-sm md:text-md"
                >
                  Get Started
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-800 text-2xl">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-40">
          <ul className="flex flex-col items-start p-4 space-y-4 font-medium text-base">
            <li>
              <Link to="/about" onClick={toggleMenu}>About Us</Link>
            </li>
            {!isAuthenticated && (
              <li>
                <Link to="/ourofferings" onClick={toggleMenu}>Our Courses</Link>
              </li>
            )}
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/mycourses" onClick={toggleMenu}>My Courses</Link>
                </li>
                <li>
                  <Link to="/profile" onClick={toggleMenu}>Profile</Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/contactus" onClick={toggleMenu}>Contact Us</Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    onClick={toggleMenu}
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Get Started
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
