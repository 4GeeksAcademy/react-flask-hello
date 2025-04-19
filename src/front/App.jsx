import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer"; // Asegúrate de tener este archivo o crea uno vacío

export const App = () => {
  return (
    <ScrollToTop>
      <Navbar />
      <div className="container py-4">
        <Outlet />
      </div>
      <Footer />
    </ScrollToTop>
  );
};

export default App;
