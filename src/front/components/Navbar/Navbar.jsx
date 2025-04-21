import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/img/Logo_DronFarm_Iconocolor_sinmarco.png";
import logoDark from "../../assets/img/Logo_DronFarm_IconoBlanco_sinmarco.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = document.body;
    const observer = new MutationObserver(() => {
      setIsDarkMode(root.classList.contains("dark-mode"));
    });

    // Set initial state and observe body
    setIsDarkMode(root.classList.contains("dark-mode"));
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false); // cerrar menú hamburguesa al hacer clic
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-content">
        <img
          src={isDarkMode ? logoDark : logo}
          alt="Logo DronFarm"
          className="logo-navbar"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />

        <div className="navbar-right">
          <div className={`hamburger-menu-container ${menuOpen ? "active" : ""}`}>
            <div className="hamburger-icon" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
              <a onClick={() => goTo("/")}>Inicio</a>
              <a onClick={() => goTo("/servicios")}>Servicios</a>
              <a onClick={() => goTo("/nosotros")}>Nosotros</a>
              <a onClick={() => goTo("/contacto")}>Contacto</a>
            </div>
          </div>

          <div className="nav-buttons">
            <button className="login-btn" onClick={() => goTo("/login")}>
              Iniciar Sesión
            </button>
            <button className="signup-btn" onClick={() => goTo("/signup")}>
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
