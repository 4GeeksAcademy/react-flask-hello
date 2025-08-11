// src/front/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon, UserIcon } from "@heroicons/react/24/outline";
import { supabase } from "../../api/supabaseClient.js";

const navigation = [
  { name: "Home", to: "/home" },           // o "/" 
  { name: "Eventos", to: "/crear-evento" } 
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Cerrar menú de perfil al cliquear fuera (Grabación del sábado con Hori)
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cerrar menús al navegar
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="knect-navbar">
      <div className="navbar-bg"></div>
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Botón burger (móvil) */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            aria-label="Abrir menú"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <XMarkIcon className="icon" /> : <Bars3Icon className="icon" />}
          </button>

          {/* Marca + navegación */}
          <div className="brand-and-nav" style={{ flex: 1 }}>
            <Link to="/" className="navbar-logo" aria-label="Knect - Inicio">
              <img src="src/front/assets/img/Knect-logo.png" alt="Knect logo" />
              <span>Knect</span>
            </Link>

            <nav className="navbar-nav" aria-label="Navegación principal">
              <ul className="navbar-nav-list">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        "navbar-link" + (isActive ? " active" : "")
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Acciones derecha */}
          <div className="navbar-actions">
            <NavLink to="/login" className="navbar-link">Login</NavLink>
            <NavLink to="/register" className="navbar-link">Register</NavLink>

            <button className="btn-danger" onClick={handleLogout} type="button">
              Logout
            </button>

            <div className="profile-menu" ref={profileMenuRef}>
              <button
                className="profile-btn"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                type="button"
                aria-label="Abrir menú de perfil"
                aria-expanded={isProfileMenuOpen}
              >
                <div className="profile-avatar">
                  <UserIcon className="icon" />
                </div>
              </button>

              {isProfileMenuOpen && (
                <div className="profile-dropdown">
                  <button className="dropdown-item" type="button">
                    <UserIcon className="icon-sm" /> Tu perfil
                  </button>
                  <button className="dropdown-item" type="button">Configuración</button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout" onClick={handleLogout} type="button">
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Panel móvil */}
        {isMobileMenuOpen && (
          <div className="mobile-panel active">
            <ul className="mobile-nav-list">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      "mobile-nav-link" + (isActive ? " active" : "")
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/login"
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </NavLink>
              </li>
              <li>
                <button
                  className="mobile-nav-link danger"
                  onClick={handleLogout}
                  type="button"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
