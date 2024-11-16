import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom"; // Import Outlet for nested routes
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("Scrolling to top in layout...");
    const layoutElement = document.querySelector(".scrollable");
    layoutElement.scrollTop = 0;
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen scrollable">
      <Header />
      <main className="grow mt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
