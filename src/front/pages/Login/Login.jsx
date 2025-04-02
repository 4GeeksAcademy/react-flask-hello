import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("rol_id", data.user.rol_id); // guardar rol
        localStorage.setItem("user_id", data.user.id);     // opcional

        console.log("Log in exitoso !!");

        if (data.user.rolId === 2) {
          navigate("/dashboard");
        } else if (data.user.rolId === 1) {
          navigate("/dash_admin");
        } else {
          setError("Rol no reconocido");
        }
      } else {
        setError(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error de conexión");
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2 className="login-title">Iniciar Sesión</h2>
        {error && <div className="login-error alert alert-danger">{error}</div>}
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
          ¿No tienes cuenta? <a className="login-link" href="/signup">Regístrate aquí</a>.
        </p>
      </div>
    </div>
  );
};
