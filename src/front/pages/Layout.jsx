import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop.jsx";
import Navbar from "../components/Navbar.jsx";   // ⬅️ default import
import Footer from "../components/Footer.jsx";   // haz lo mismo con Footer

export default function Layout() {
  return (
    <ScrollToTop>
      <Navbar />
      <Outlet />
      <Footer />
    </ScrollToTop>
  );
}