import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen scrollable'>
      <Header />
      <main className='grow mt-20'>
        <Outlet /> {/* This will render the nested routes */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
