// src/pages/PublicLayout.jsx
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./PublicLayout.css"; // opcional, solo si necesitas estilos específicos

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="app-root">
        <div className="content-container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PublicLayout;
