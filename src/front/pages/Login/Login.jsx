import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { showErrorAlert, showSuccessAlert } from '../../components/modal_alerts/modal_alerts';
import { useGlobalReducer } from "../../hooks/useGlobalReducer";
import DarkModeToggle from "../../components/DarkModeToggle/DarkModeToggle";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ✅ Observar el body y reaccionar a cambios en la clase "dark-mode"
  useEffect(() => {
    const root = document.body;
    if (!root) return;

    const observer = new MutationObserver(() => {
      setIsDarkMode(root.classList.contains("dark-mode"));
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    // Establecer estado inicial
    setIsDarkMode(root.classList.contains("dark-mode"));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        const { id, rolId } = data.user;
        const token = data.access_token;

        dispatch({
          type: "LOGIN",
          payload: {
            token,
            rolId,
            userId: id,
          }
        });

        localStorage.setItem("fromLogin", "true");

        if (Number(rolId) === 2) {
          const fieldRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/fields/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          const userFields = await fieldRes.json();

          if (Array.isArray(userFields) && userFields.length > 0) {
            showSuccessAlert("¡Inicio de sesión exitoso!", () => {
              navigate("/app/dashboard");
            });
          } else {
            showSuccessAlert("¡Bienvenido! Registra tu primer cultivo 🌱", () => {
              navigate("/app/plot_form");
            });
          }
        } else {
          showSuccessAlert("¡Inicio de sesión exitoso!", () => {
            navigate("/app/dash_admin");
          });
        }
      } else {
        showErrorAlert(data.error || "Datos incorrectos");
      }
    } catch (err) {
      showErrorAlert("Error de conexión con el servidor");
    }
  };

  return (
    <div className={`login-container-landing fade-in ${isDarkMode ? "dark-mode" : ""}`}>
      <DarkModeToggle />
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="login-btn-submit" type="submit">Ingresar</button>
        </form>
        <p className="login-footer">
          ¿No tienes cuenta? <a href="/signup">Regístrate aquí</a>
        </p>
        <p className="login-footer">
          ¿Olvidaste tu contraseña? <a href="/forgot-password">Recuperar acceso</a>
        </p>
      </div>
    </div>
  );
};
