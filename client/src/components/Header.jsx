// import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../Context/AuthContext';


// const Header = () => {
//   const { isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout(); 
//     navigate('/'); 
//   };

//   return (
//     <div className='fixed top-0 left-0 w-full bg-white shadow-lg z-50 flex justify-between items-center p-5 pl-24 text-lg pt-4 pb-4'>
//       <div>
//         <Link to='/'>
//           <img src='/logo.jpeg' alt='Logo' className='h-[55px]' /> 
//         </Link>
//       </div>
//       <nav>
//         <ul className='flex flex-row items-center space-x-12 pr-10 font-medium text-xl'>
//           <li><Link to='/about'>About Us</Link></li>
//           <li><Link to='/ourofferings'>Our Offerings</Link></li>

//           {isAuthenticated ? (
//             <>
//               <li><Link to='/mycourses'>My Courses</Link></li>
//               <li><Link to='/profile'>Profile</Link></li>
//               <li>
//                 <button onClick={handleLogout} className='bg-green-600 text-white px-5 py-3 rounded-md text-md'>
//                   Logout
//                 </button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li><Link to='/login'>Login</Link></li>
//               <li>
//                 <Link to='/signup' className='bg-green-600 text-white px-5 py-3 rounded-md text-md'>
//                   Register
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Header;
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

  useEffect(() => {
  }, [isAuthenticated]);

  return (
    <div className='fixed top-0 left-0 w-full bg-white shadow-lg z-50 flex justify-between items-center p-5 pl-24 text-lg pt-3 pb-3'>
      <div>
        <Link to='/'>
        <div className='flex flex-row items-center justify-center gap-4'>

          <img src='/logo.jpeg' alt='Logo' className='h-[50px]' /> 
          <span className='text-4xl py-2 font-semibold h-[55px]  text-gray-800'>URMILA</span>
        </div>
        </Link>
      </div>
      <nav>
        <ul className='flex flex-row items-center space-x-12 pr-10 font-medium text-xl'>
          <li className='listitem'><Link to='/about'>About Us</Link></li>
          {!isAuthenticated  &&
          <li className='listitem'><Link to='/ourofferings'>Our Offerings</Link></li>
          }
          {isAuthenticated ? (
            <>
              <li className='listitem'><Link to='/mycourses'>My Courses</Link></li>
              <li className='listitem'><Link to='/profile'>Profile</Link></li>
              <li className='listitem'>
                <button onClick={handleLogout} className='bg-green-600 text-white px-5 py-3 rounded-md text-md'>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className='listitem'><Link to='/contactus'>Contact Us</Link></li>
              <li className='listitem'>
                <Link to='/signup' className='bg-green-600 text-white px-5 py-4 rounded-md text-md'>
                  Get Started
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
