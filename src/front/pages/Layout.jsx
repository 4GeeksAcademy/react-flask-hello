/* 👇 ❇️ Riki for the group success 👊 Lunes7Abril*/

import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export const Layout = () => {
  return (
    <ScrollToTop>
      <div className="layout-container">
        <Navbar />
        <main className="content-wrapper">
          <div className="content-inner"> {/* Nuevo contenedor interno */}
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </ScrollToTop>
  );
};