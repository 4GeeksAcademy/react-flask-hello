import { useState, useEffect, useRef } from "react";
import { Bars3Icon, XMarkIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../../api/supabaseClient.js';

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "eventos", href: "#", current: false },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="knect-navbar">
      <div className="navbar-bg"></div>
      <div className="navbar-container">
        <div className="navbar-content">
          <button className="mobile-menu-btn" onClick={toggleMobileMenu} type="button">
            {isMobileMenuOpen ? <XMarkIcon /> : <Bars3Icon />}
          </button>

          <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
            <div className="navbar-logo">
              <img src="/Knect-logo.png" alt="Knect logo" />
            </div>

            <nav className="navbar-nav">
              <ul className="navbar-nav-list">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={`navbar-link ${item.current ? "active" : ""}`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="navbar-actions" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#e53e3e',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              type="button"
            >
              Logout
            </button>

            <div className="profile-menu" ref={profileMenuRef}>
              <button className="profile-btn" onClick={toggleProfileMenu} type="button">
                <div className="profile-avatar">
                  <UserIcon />
                </div>
              </button>
              {isProfileMenuOpen && (
                <div className="profile-dropdown active">
                  <a href="#" className="dropdown-item">
                    <UserIcon /> Tu perfil
                  </a>
                  <a href="#" className="dropdown-item">Configuración</a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item logout">Cerrar sesión</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-panel active">
          <ul className="mobile-nav-list">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`mobile-nav-link ${item.current ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li>
              <Link to="/login" className="mobile-nav-link" onClick={closeMobileMenu}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="mobile-nav-link" onClick={closeMobileMenu}>
                Register
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="mobile-nav-link"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: 'inherit',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
                type="button"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
