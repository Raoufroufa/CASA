import React, { useEffect, useRef } from "react";
import Header from "../components/Header";

import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer.jsx";

function Layout() {
  const pathname = useLocation().pathname;
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current && scrollRef.current.scrollIntoView();
  }, [pathname]);
  return (
    <>
      <div ref={scrollRef}></div>
      <Header />
      <div className="px-4">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default Layout;
