/* 👇 ❇️ Riki for the group success 👊 Lunes9Abril*/

import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "../components/ScrollToTop";
import PublicNavbar from "../components/Navbar/PublicNavbar";
import Footer from "../components/Footer/Footer";
import "./Layout.css";  // Reutilizamos los mismos estilos

export const PublicLayout = () => {
  const location = useLocation();
  
  // Usar useEffect para añadir un atributo al body basado en la ruta actual
  useEffect(() => {
    // Extraer el nombre de la ruta (sin el slash inicial)
    const routeName = location.pathname.substring(1) || "landing";
    
    // Añadir el atributo data-route al body
    document.body.setAttribute("data-route", routeName);
    
    // Limpieza cuando el componente se desmonte
    return () => {
      document.body.removeAttribute("data-route");
    };
  }, [location]);

  return (
    <ScrollToTop>
      <div className="app-root">
        <PublicNavbar />
        <div className="content-container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </ScrollToTop>
  );
};

export default PublicLayout;