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
    <div
      className="py-4 px-4 md:px-8 flex flex-col min-h-screen mx-auto"
      style={{ maxWidth: "90%" }}
    >
      <div ref={scrollRef}></div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
