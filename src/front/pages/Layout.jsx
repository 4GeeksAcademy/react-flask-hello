/* 👇 ❇️ Riki for the group success 👊 */

import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar/Navbar";  // Ruta ajustada
import Footer from "../components/Footer/Footer";  // Ruta ajustada

export const Layout = () => {
  return (
    <ScrollToTop>
      <div className="layout-container">
        <Navbar />
        <main className="content-wrapper">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ScrollToTop>
  );
};