/* 👇 ❇️ Riki for the group success 👊 Lunes9Abril*/

import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import PublicNavbar from "../components/Navbar/PublicNavbar";
import Footer from "../components/Footer/Footer";
import "./Layout.css";  // Reutilizamos los mismos estilos

export const PublicLayout = () => {
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