// src/front/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserIcon, 
  SparklesIcon,
  CalendarIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import { supabase } from "../../api/supabaseClient.js";
import { notifyError, notifySuccess } from '../utils/Notifications';
import Knect_logo from "../assets/img/Knect_logo.png";

// 👉 IMPORT del toggle PacMan
import { PacmanToggle } from "./PacmanToggle.jsx";

const navigation = [
  { 
    name: "Home", 
    to: "/", 
    icon: "🏠",
    description: "Inicio"
  },
  { 
    name: "Eventos", 
    to: "/eventos",
    icon: "🎉", 
    description: "Explorar eventos"
  }
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Efecto de scroll para navbar dinámico
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Logout mejorado
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
      notifySuccess("¡Hasta pronto! 👋");
      navigate("/login");
    } catch (err) {
      notifyError("Error inesperado al cerrar sesión");
      console.error("Error inesperado:", err);
    }
  };

  return (
    <nav className={`knect-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-bg-effect"></div>
      
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Botón burger (móvil) con animación */}
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            aria-label="Abrir menú"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="burger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* Marca mejorada */}
          <div className="brand-and-nav">
            <Link to="/" className="navbar-logo magic-hover" aria-label="Knect - Inicio">
              <div className="logo-container">
                <img src={Knect_logo} alt="Logo" className="logo-image" />
                <div className="logo-glow"></div>
              </div>
              <div className="brand-text">
                <span className="brand-name">Knect</span>
                <span className="brand-tagline">Tu red de eventos</span>
              </div>
            </Link>

            {/* Navegación principal con efectos */}
            <nav className="navbar-nav" aria-label="Navegación principal">
              <ul className="navbar-nav-list">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) => 
                        `navbar-link ${isActive ? 'active' : ''}`
                      }
                      title={item.description}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span className="nav-text">{item.name}</span>
                      <div className="nav-indicator"></div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Acciones derecha con efectos */}
          <div className="navbar-actions">
            {/* Toggle de tema mejorado */}
            <div className="theme-toggle-container">
              <PacmanToggle />
            </div>

            {/* Botón de crear evento rápido */}
            {token && (
              <Link to="/crear-evento" className="quick-create-btn" title="Crear evento">
                <PlusIcon className="icon" />
                <span className="btn-text">Crear</span>
                <div className="btn-shine"></div>
              </Link>
            )}

            {/* Sistema de autenticación */}
            {!token ? (
              <div className="auth-buttons">
                <NavLink to="/login" className="auth-link login-link">
                  Entrar
                </NavLink>
                <NavLink to="/register" className="auth-link register-link">
                  Registro
                </NavLink>
              </div>
            ) : (
              <div className="profile-menu" ref={profileMenuRef}>
                <button
                  className={`profile-btn ${isProfileMenuOpen ? 'active' : ''}`}
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  type="button"
                  aria-label="Abrir menú de perfil"
                  aria-expanded={isProfileMenuOpen}
                >
                  <div className="profile-avatar">
                    <UserIcon className="icon" />
                    <div className="avatar-glow"></div>
                  </div>
                  <div className="profile-indicator">
                    <div className="indicator-dot"></div>
                  </div>
                </button>

                {/* Dropdown mejorado */}
                {isProfileMenuOpen && (
                  <div className="profile-dropdown glass-advanced">
                    <div className="dropdown-header">
                      <SparklesIcon className="header-icon" />
                      <span>Mi Cuenta</span>
                    </div>
                    
                    <div className="dropdown-section">
                      <Link to="/user/perfil" className="dropdown-item">
                        <UserIcon className="item-icon" />
                        <span>Mi Perfil</span>
                        <div className="item-arrow">→</div>
                      </Link>
                      
                      <Link to="/crear-evento" className="dropdown-item">
                        <PlusIcon className="item-icon" />
                        <span>Crear Evento</span>
                        <div className="item-arrow">→</div>
                      </Link>
                      
                      <Link to="/mis-eventos" className="dropdown-item">
                        <CalendarIcon className="item-icon" />
                        <span>Mis Eventos</span>
                        <div className="item-arrow">→</div>
                      </Link>
                    </div>
                    
                    <div className="dropdown-divider"></div>
                    
                    <button 
                      className="dropdown-item logout-item" 
                      onClick={handleLogout} 
                      type="button"
                    >
                      <span className="logout-icon">👋</span>
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Panel móvil espectacular */}
        {isMobileMenuOpen && (
          <div className="mobile-panel glass-advanced">
            <div className="mobile-header">
              <SparklesIcon className="mobile-header-icon" />
              <span>Navegación</span>
            </div>

            <ul className="mobile-nav-list">
              {/* Toggle también en móvil */}
              <li className="mobile-toggle-item">
                <div className="mobile-toggle-label">
                  <span>🌓</span>
                  <span>Cambiar Tema</span>
                </div>
                <PacmanToggle />
              </li>

              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => 
                      `mobile-nav-link ${isActive ? 'active' : ''}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mobile-nav-icon">{item.icon}</span>
                    <span className="mobile-nav-text">{item.name}</span>
                    <span className="mobile-nav-description">{item.description}</span>
                  </NavLink>
                </li>
              ))}

              {!token ? (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className="mobile-nav-link auth-item"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mobile-nav-icon">🔐</span>
                      <span className="mobile-nav-text">Iniciar Sesión</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className="mobile-nav-link auth-item register"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mobile-nav-icon">✨</span>
                      <span className="mobile-nav-text">Registrarse</span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/user/perfil"
                      className="mobile-nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mobile-nav-icon">👤</span>
                      <span className="mobile-nav-text">Mi Perfil</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/crear-evento"
                      className="mobile-nav-link create-item"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mobile-nav-icon">➕</span>
                      <span className="mobile-nav-text">Crear Evento</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/mis-eventos"
                      className="mobile-nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mobile-nav-icon">📅</span>
                      <span className="mobile-nav-text">Mis Eventos</span>
                    </NavLink>
                  </li>
                  <li>
                    <button 
                      className="mobile-nav-link logout-mobile" 
                      onClick={handleLogout} 
                      type="button"
                    >
                      <span className="mobile-nav-icon">👋</span>
                      <span className="mobile-nav-text">Cerrar Sesión</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>

      <style jsx>{`
        .knect-navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          border-bottom: 1px solid var(--glass-border);
        }

        .knect-navbar.scrolled {
          backdrop-filter: blur(25px) saturate(200%);
          box-shadow: var(--shadow-glow);
        }

        .navbar-bg-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, 
            var(--glow-primary) 0%, 
            transparent 50%, 
            var(--glow-secondary) 100%);
          opacity: 0.1;
          animation: navbarGlow 8s ease-in-out infinite;
        }

        @keyframes navbarGlow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
        }

        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
          position: relative;
          z-index: 10;
        }

        /* Logo espectacular */
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .logo-container {
          position: relative;
          width: 40px;
          height: 40px;
        }

        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: all 0.3s ease;
        }

        .logo-glow {
          position: absolute;
          inset: -4px;
          background: var(--btn-gradient);
          border-radius: 50%;
          opacity: 0;
          filter: blur(8px);
          transition: opacity 0.3s ease;
        }

        .navbar-logo:hover .logo-glow {
          opacity: 0.6;
        }

        .navbar-logo:hover .logo-image {
          transform: scale(1.1) rotate(5deg);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text);
          line-height: 1;
        }

        .brand-tagline {
          font-size: 0.7rem;
          color: var(--muted);
          line-height: 1;
          margin-top: 2px;
        }

        /* Navegación principal */
        .brand-and-nav {
          display: flex;
          align-items: center;
          gap: 3rem;
          flex: 1;
        }

        .navbar-nav-list {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .navbar-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: var(--text);
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 12px;
          position: relative;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .nav-icon {
          font-size: 1.1rem;
          transition: transform 0.3s ease;
        }

        .nav-text {
          font-size: 0.95rem;
        }

        .nav-indicator {
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 3px;
          background: var(--btn-gradient);
          border-radius: 2px;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .navbar-link:hover {
          background: var(--glass-hover);
          transform: translateY(-1px);
        }

        .navbar-link:hover .nav-icon {
          transform: scale(1.2);
        }

        .navbar-link:hover .nav-indicator,
        .navbar-link.active .nav-indicator {
          width: 80%;
        }

        .navbar-link.active {
          background: var(--glass-hover);
          color: var(--accent);
        }

        /* Acciones de la navbar */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .theme-toggle-container {
          display: flex;
          align-items: center;
        }

        .quick-create-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--btn-gradient);
          color: #ffffff;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.9rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .quick-create-btn .icon {
          width: 16px;
          height: 16px;
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .quick-create-btn:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: var(--shadow-glow);
        }

        .quick-create-btn:hover .btn-shine {
          left: 100%;
        }

        /* Autenticación */
        .auth-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .auth-link {
          text-decoration: none;
          color: var(--text);
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .login-link:hover {
          background: var(--glass-hover);
          color: var(--accent);
        }

        .register-link {
          background: var(--btn-gradient);
          color: #ffffff !important;
        }

        .register-link:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-soft);
        }

        /* Perfil */
        .profile-menu {
          position: relative;
        }

        .profile-btn {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .profile-btn:hover,
        .profile-btn.active {
          background: var(--glass-hover);
          transform: scale(1.05);
          box-shadow: var(--shadow-soft);
        }

        .profile-avatar {
          position: relative;
        }

        .profile-avatar .icon {
          width: 20px;
          height: 20px;
          color: var(--text);
        }

        .avatar-glow {
          position: absolute;
          inset: -2px;
          background: var(--btn-gradient);
          border-radius: 50%;
          opacity: 0;
          filter: blur(4px);
          transition: opacity 0.3s ease;
        }

        .profile-btn:hover .avatar-glow {
          opacity: 0.5;
        }

        .profile-indicator {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 8px;
          height: 8px;
        }

        .indicator-dot {
          width: 100%;
          height: 100%;
          background: #10b981;
          border-radius: 50%;
          border: 2px solid var(--glass-bg);
          animation: indicatorPulse 2s ease-in-out infinite;
        }

        @keyframes indicatorPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Dropdown */
        .profile-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 220px;
          padding: 16px;
          animation: dropdownSlide 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .dropdown-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--accent);
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--glass-border);
        }

        .header-icon {
          width: 16px;
          height: 16px;
        }

        .dropdown-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          text-decoration: none;
          color: var(--text);
          font-weight: 500;
          transition: all 0.2s ease;
          background: transparent;
          border: none;
          cursor: pointer;
          width: 100%;
          font-size: 0.9rem;
        }

        .dropdown-item:hover {
          background: var(--glass-hover);
          transform: translateX(4px);
        }

        .item-icon {
          width: 16px;
          height: 16px;
          color: var(--accent);
        }

        .item-arrow {
          margin-left: auto;
          color: var(--muted);
          font-weight: 400;
        }

        .dropdown-divider {
          height: 1px;
          background: var(--glass-border);
          margin: 8px 0;
        }

        .logout-item {
          color: #ef4444 !important;
        }

        .logout-icon {
          font-size: 1.1rem;
        }

        /* Móvil */
        .mobile-menu-btn {
          display: none;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          width: 44px;
          height: 44px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .burger-icon {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: center;
        }

        .burger-icon span {
          width: 18px;
          height: 2px;
          background: var(--text);
          border-radius: 1px;
          transition: all 0.3s ease;
        }

        .mobile-menu-btn.active .burger-icon span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-btn.active .burger-icon span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-btn.active .burger-icon span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        .mobile-panel {
          margin-top: 1rem;
          padding: 20px;
          border-radius: 20px;
          animation: mobileSlide 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @keyframes mobileSlide {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--glass-border);
        }

        .mobile-header-icon {
          width: 18px;
          height: 18px;
        }

        .mobile-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-toggle-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          background: var(--glass-hover);
          border-radius: 12px;
          margin-bottom: 8px;
        }

        .mobile-toggle-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text);
          font-weight: 500;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          text-decoration: none;
          color: var(--text);
          font-weight: 500;
          transition: all 0.3s ease;
          background: transparent;
          border: none;
          cursor: pointer;
          width: 100%;
        }

        .mobile-nav-link:hover {
          background: var(--glass-hover);
          transform: translateX(4px);
        }

        .mobile-nav-link.active {
          background: var(--glass-hover);
          color: var(--accent);
        }

        .mobile-nav-icon {
          font-size: 1.2rem;
          width: 24px;
          text-align: center;
        }

        .mobile-nav-text {
          font-weight: 600;
        }

        .mobile-nav-description {
          font-size: 0.8rem;
          color: var(--muted);
          margin-left: auto;
        }

        .auth-item.register {
          background: var(--btn-gradient);
          color: #ffffff !important;
        }

        .create-item {
          background: var(--glass-hover);
          border: 1px solid var(--accent);
        }

        .logout-mobile {
          color: #ef4444 !important;
          margin-top: 8px;
          border-top: 1px solid var(--glass-border);
          padding-top: 16px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .navbar-nav,
          .auth-buttons,
          .quick-create-btn .btn-text {
            display: none;
          }

          .brand-text {
            display: none;
          }

          .quick-create-btn {
            padding: 8px;
          }
        }

        @media (max-width: 480px) {
          .navbar-container {
            padding: 0 1rem;
          }

          .navbar-content {
            height: 60px;
          }

          .logo-container {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </nav>
  );
}