import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import  Navbar  from "../components/Navbar";
// Añade un componente Footer vacío si no tienes aún
const Footer = () => (
  <footer className="text-center text-muted py-3">
    <hr />
    <small>LevelUp © {new Date().getFullYear()}</small>
  </footer>
);

export const Layout = () => {
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
