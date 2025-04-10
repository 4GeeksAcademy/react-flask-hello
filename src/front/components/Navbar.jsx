import { useNavigate } from "react-router-dom";
import "./Styles/Navbar.css";
import LogoFrame from "./Logo";
import { useTheme } from '../Contexts/ThemeContext.jsx';
import { useState, useEffect } from "react";


const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Manejo reactivo del estado de login
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access_token"));

  // FUNCION DEL BOTON LOGOUT
  const LogoutButton = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false); // Actualiza el estado después de hacer logout
    navigate("/login");
  };

  // Monitorear cambios en localStorage y actualizar el estado
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("access_token"));
      console.log('estas logueado')
      console.log(handleStorageChange)
    };

    // Escuchar cambios en localStorage
    window.addEventListener("storage", handleStorageChange);
    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <nav>
      <div className="nav-content">
        <div className="logo">
          <LogoFrame />
        </div>
        <div className="nav_buttons">
          {!isLoggedIn && (
            <>
              <button className="nav-btn" onClick={() => navigate("/")}>Register</button>
              <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
            </>
          )}
          <button className="nav-btn" onClick={() => navigate("/home")}>Home</button>
          <button className="nav-btn" onClick={() => navigate("/settings")}>Settings</button>
          {isLoggedIn && (
            <button className="nav-btn" onClick={LogoutButton}>Cerrar sesión</button>
          )}
          {/* BOTÓN DE CAMBIO DE TEMA */}
          <button
            onClick={toggleTheme}
            className="nav-btn"
            style={{
              backgroundColor: "var(--primary)",
              color: "white",
              borderRadius: "5px",
              padding: "5px 10px",
            }}
          >
            {theme === "light" ? "Oscuro" : "Claro"}
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
