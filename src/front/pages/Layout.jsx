// src/pages/Layout.jsx
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./Layout.css";

export const Layout = () => {
  return (
    <>
      {/* 👇 Aquí lo colocamos */}
      <Navbar />
      <ScrollToTop /> {/* ✅ Colocado después del navbar */}
      <div className="app-root">
        <div className="content-container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
