// src/front/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon, UserIcon } from "@heroicons/react/24/outline";
import { supabase } from "../../api/supabaseClient.js";
import { notifyError, notifySuccess } from '../utils/Notifications';

const navigation = [
  { name: "Home", to: "/" },           // o "/"
  { name: "Eventos", to: "/eventos" }
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Cerrar menú de perfil al cliquear fuera
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

  // Logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        notifyError("Error cerrando sesión en Supabase");
        console.error("Error cerrando sesión:", error);
        return;
      }
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      notifySuccess("Sesión cerrada, ¡hasta pronto!");
      navigate("/login");
    } catch (err) {
      notifyError("Error inesperado al cerrar sesión");
      console.error("Error inesperado:", err);
    }
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
            </Link>

            <nav className="navbar-nav" aria-label="Navegación principal">
              <ul className="navbar-nav-list">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")}
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
            {
              !token ? (
                <>
                  <NavLink to="/login" className="navbar-link">Login</NavLink>
                  <NavLink to="/register" className="navbar-link">Register</NavLink>
                </>
              ) : (
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
                      <Link to={"/user/perfil"}>
                        <button className="dropdown-item" type="button">
                         <UserIcon className="icon-sm" /> Tu perfil
                         </button>
                      </Link>
                      <Link to={"/crear-evento"}>
                        <button className="dropdown-item" type="button">Crear evento</button>
                      </Link>
                      <Link to={"/mis-eventos"}>
                        <button className="dropdown-item" type="button">Mis eventos</button>
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item logout" onClick={handleLogout} type="button">
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              )
            }
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
                    className={({ isActive }) => "mobile-nav-link" + (isActive ? " active" : "")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}

              {!token ? (
                <>
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
                </>
              ) : (
                <>
                  {/* Opcionales en móvil: accesos rápidos del perfil */}
                  <li>
                    <NavLink
                      to="/perfil"
                      className="mobile-nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Tu perfil
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/crear-evento"
                      className="mobile-nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Crear evento
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/mis-eventos"
                      className="mobile-nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Mis eventos
                    </NavLink>
                  </li>
                  <li>
                    <button className="mobile-nav-link danger" onClick={handleLogout} type="button">
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
