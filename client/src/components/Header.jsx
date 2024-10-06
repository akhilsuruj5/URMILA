import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className='flex justify-between items-center p-5 pl-24 bg-gray-100 text-lg pt-5 pb-5'>
      <div className=''><Link to='/'>Logo</Link></div>
      <nav>
        <ul className='flex flex-row items-center space-x-12 pr-10 font-medium'>
          {/* <li><Link to='/'>Home</Link></li> */}
          <li><Link to='/about'>About Us</Link></li>
          <li><Link to='/ourofferings'>Our Offerings</Link></li>

          {isLoggedIn ? (
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
                <Link to='/signup' className='bg-black text-white px-4 py-3 rounded-md text-sm'>
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
