import { Outlet, useLocation } from "react-router-dom"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { NavbarUser } from "../components/navbarUser"

export const Layout = () => {
  const location = useLocation();

  const userAreaRoutes = [
    "/User",
    "/Profesores",
    "/checkout",
    "/Login"
  ];

  const showUserNavbar = userAreaRoutes.includes(location.pathname);

  return (
    <div id="app">
      <ScrollToTop>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
        <Footer />
      </ScrollToTop>
    </div>
  );
};
