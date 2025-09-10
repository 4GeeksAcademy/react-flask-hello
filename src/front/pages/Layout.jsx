import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "../context/ThemeContext.jsx"; // ← nuevo
import "../styles/theme.css";                                 // ← nuevo

// Mantiene navbar, footer y scroll, y ahora el tema global
export const Layout = () => {
  return (
    <ThemeProvider>
      <ScrollToTop>
        <Navbar />
        <div className="container_layout">
          <Outlet />
        </div>
        <Footer />
        <ToastContainer />
      </ScrollToTop>
    </ThemeProvider>
  );
};
