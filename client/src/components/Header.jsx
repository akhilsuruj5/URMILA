import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {}, [isAuthenticated]);

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 flex justify-between items-center p-4 md:p-3 md:pl-24 text-lg">
      <div>
        <Link to="/">
          <div className="flex flex-row items-center gap-2 md:gap-4">
            <img src="/logo.jpeg" alt="Logo" className="h-10 md:h-[50px]" />
            <span className="text-2xl md:text-4xl font-semibold text-gray-800">URMILA</span>
          </div>
        </Link>
      </div>
      <nav>
        <ul className="flex flex-row items-center space-x-4 md:space-x-12 pr-2 md:pr-10 font-medium text-base md:text-xl">
          <li className="hidden md:block"><Link to="/about">About Us</Link></li>
          {!isAuthenticated && (
            <li className="hidden md:block"><Link to="/ourofferings">Our Courses</Link></li>
          )}
          {isAuthenticated ? (
            <>
              <li className="hidden md:block"><Link to="/mycourses">My Courses</Link></li>
              <li className="hidden md:block"><Link to="/profile">Profile</Link></li>
              <li className="hidden md:block">
                <button onClick={handleLogout} className="bg-green-600 text-white px-4 py-2 md:px-5 md:py-3 rounded-md text-sm md:text-md">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="hidden md:block"><Link to="/contactus">Contact Us</Link></li>
              <li className="hidden md:block">
                <Link to="/signup" className="bg-green-600 text-white px-4 py-2 md:px-5 md:py-4 rounded-md text-sm md:text-md">
                  Get Started
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {/* Mobile Menu */}
      <div className="md:hidden flex items-center space-x-4">
        <Link to="/" className="text-base font-medium">About Us</Link>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
          onClick={() => (isAuthenticated ? handleLogout() : navigate('/signup'))}
        >
          {isAuthenticated ? 'Logout' : 'Get Started'}
        </button>
      </div>
    </div>
  );
};

export default Header;
