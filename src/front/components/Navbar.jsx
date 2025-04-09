import { useNavigate } from "react-router-dom";
import "./Styles/Navbar.css";
import LogoFrame from "./Logo";
import { useTheme } from '../Contexts/ThemeContext.jsx'; // Asegúrate de tener el ThemeContext implementado

const Navbar = () => {
	const { theme, toggleTheme } = useTheme(); // Usamos el contexto aquí
	const navigate = useNavigate();

  return (
    <nav>
      <div className="nav-content">
        <div className="logo">
          <LogoFrame />
        </div>

        <div className="nav_buttons">
          <button className="nav-btn" onClick={() => navigate("/")}>Register</button>
          <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="nav-btn" onClick={() => navigate("/home")}>Home</button>
          <button className="nav-btn" onClick={() => navigate("/settings")}>Settings</button>

         {/* BOTON DE CAMBIO DE TEMA */}
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
            {theme === "light" ? "🌙 Oscuro" : "☀️ Claro"}
          </button>
          {/* BOTON DE CAMBIO DE TEMA */}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
