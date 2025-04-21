import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorAlert, showSuccessAlert } from "../../components/modal_alerts/modal_alerts";
import { useGlobalReducer } from "../../hooks/useGlobalReducer";
import DarkModeToggle from "../../components/DarkModeToggle/DarkModeToggle";
import "./Signup.css";
import { Link } from "react-router-dom";


const Signup = () => {
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    const root = document.body;
    if (!root) return;

    const observer = new MutationObserver(() => {
      setIsDarkMode(root.classList.contains("dark-mode"));
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    setIsDarkMode(root.classList.contains("dark-mode"));

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        mode: "cors"
      });
      const data = await response.json();

      if (response.ok) {
        if (data.access_token && data.user) {
          dispatch({
            type: "LOGIN",
            payload: {
              token: data.access_token,
              rolId: data.user.rolId,
              userId: data.user.id
            }
          });
        }
        navigate("/app/plot_form");
        showSuccessAlert(data.msg || "¡Registro realizado con éxito!");
        setFormData({ name: "", lastname: "", dni: "", email: "", password: "" });
      } else {
        showErrorAlert(data.error || "Error en el registro");
      }
    } catch (err) {
      showErrorAlert("Error del servidor");
    }
  };

  return (
    <div className={`landing-container fade-in ${isDarkMode ? "dark-mode" : ""}`}>
      <DarkModeToggle />
      <div className="login-card">
        <h2 className="login-title">Registro</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
            className="login-input"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Apellido"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="login-input"
          />
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={formData.dni}
            onChange={handleChange}
            required
            className="login-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
          />
          <button type="submit" className="login-btn-submit">Registrarse</button>
        </form>
        <p className="login-footer">
          ¿Ya tienes cuenta? <Link to="/login" className="login-link">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
