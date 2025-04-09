/* 👇 ❇️ Riki for the group success 👊 9 Abril*/

import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./Layout.css";  // Importamos los estilos

export const Layout = () => {
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