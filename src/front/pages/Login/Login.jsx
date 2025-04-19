import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { showErrorAlert, showSuccessAlert } from '../../components/modal_alerts/modal_alerts';
import { useGlobalReducer } from "../../hooks/useGlobalReducer";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();

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
        dispatch({
          type: "LOGIN",
          payload: {
            token: data.access_token,
            rolId: data.user.rolId,
            userId: data.user.id
          }
        });

        localStorage.setItem("fromLogin", "true");

        showSuccessAlert("¡Inicio de sesión exitoso!", () => {
          navigate(Number(data.user.rolId) === 2 ? "/app/dashboard" : "/app/dash_admin");
        });
      } else {
        showErrorAlert(data.error || "Datos incorrectos");
      }
    } catch (err) {
      showErrorAlert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
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
          <button className="login-button" type="submit">Ingresar</button>
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
