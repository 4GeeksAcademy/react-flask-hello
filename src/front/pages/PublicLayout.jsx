import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "../components/ScrollToTop";
import PublicNavbar from "../components/Navbar/PublicNavbar";
import Footer from "../components/Footer/Footer";
import "./Layout.css";

const PublicLayout = () => {
  return (
    <>
      <ScrollToTop />
      <div className="app-root">
        <PublicNavbar />
        <div className="content-container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};


export default PublicLayout;
