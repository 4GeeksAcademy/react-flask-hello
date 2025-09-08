/* 👇 ❇️ Riki for the group success 👊 9 Abril*/

import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./Layout.css";  // Importamos los estilos

export const Layout = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Extraer la ruta principal sin slash inicial
    const path = location.pathname;
    
    // Detectar las páginas específicas para asignar data-route
    if (path === "/login" || path === "/") {
      document.body.setAttribute("data-route", "login");
    } else if (path === "/signup") {
      document.body.setAttribute("data-route", "signup");
    } else if (path === "/contacto") {
      document.body.setAttribute("data-route", "contacto");
    } else if (path === "/plot_form" || path.includes("/form/plot")) {
      document.body.setAttribute("data-route", "plot_form");
    } else {
      // Para otras páginas, quitar el atributo o usar un valor por defecto
      document.body.removeAttribute("data-route");
    }
    
    // Limpieza al desmontar
    return () => {
      // Opcional: quitar el atributo cuando el componente se desmonte
      // document.body.removeAttribute("data-route");
    };
  }, [location]);
  
  return (
    <ScrollToTop>
      <div className="app-root">
        <Navbar />
        <div className="content-container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </ScrollToTop>
  );
};