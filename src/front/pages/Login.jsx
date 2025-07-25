import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });
      const data = await resp.json();
      if (resp.ok) {
        navigate("/dashboard");
      } else {
        setError(data.message || "Error en el inicio de sesión.");
      }
    } catch (err) {
      setError("Error de conexión.");
    }
  };

  return (
    <div>
      <h1 className="text-center mb-5">¡Bienvenido a PatitasClub!</h1>

      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3 text-center">
          <label htmlFor="username">Nombre de usuario:</label>
          <input className="form-control" type="text" id="username" name="username" required value={form.username} onChange={handleChange} />
        </div>
        <div className="mb-3 text-center">
          <label htmlFor="password">Contraseña:</label>
          <input className="form-control" type="password" id="password" name="password" required value={form.password} onChange={handleChange} />
        </div>
        <div className="text-center">
          <button className="btn btn-primary mt-2" type="submit">Iniciar sesión</button>
        </div>
      </form>
      <p className="text-center mt-3">
        ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
      <p className="text-center mb-1">
        <Link to="/">Volver a la página principal</Link>
      </p>
    </div>
  );
}