import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "../components/ScrollToTop";
import PublicNavbar from "../components/Navbar/PublicNavbar";
import Footer from "../components/Footer/Footer";
import "./Layout.css";  // Mantienes tus estilos de layout

export const PublicLayout = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/"; // 👈 Detectamos si estás en la landing

  useEffect(() => {
    const routeName = location.pathname.substring(1) || "landing";
    document.body.setAttribute("data-route", routeName);

    return () => {
      document.body.removeAttribute("data-route");
    };
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <div className="app-root">
        {!isLanding && <PublicNavbar />}  {/* 👈 Ocultamos el navbar si estás en la landing */}
        <div className="content-container">
          <Outlet />
        </div>
        {!isLanding && <Footer />}  {/* 👈 Ocultamos el footer si estás en la landing */}
      </div>
    </>
  );
};


export default PublicLayout;
