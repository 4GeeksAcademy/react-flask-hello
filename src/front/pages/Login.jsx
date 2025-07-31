import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export const Login = () => {
  const [form, setForm] = useState({
    email: "",
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
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });
      const data = await resp.json();
      console.log("Login response:", data); 

      if (resp.ok && data.token) {
        localStorage.setItem("token", data.token); 
        navigate("/dashboard");
      } else {
        setError(data.message || "Error en el inicio de sesión.");
      }
    } catch (err) {
      setError("Error de conexión.");
    }
  };

  return (
    <div className="container1 d-flex justify-content-start align-items-center flex-column ">
  <h1 className="text-center mb-3 title2">¡Bienvenido de nuevo a PatitasClub!</h1>

  <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px", color: "#EAE164" }}>
    <div className="mb-3 text-center">
      <label htmlFor="email">Correo electrónico:</label>
      <input
        className="form-control text-center"
        type="email"
        id="email"
        name="email"
        required
        value={form.email}
        onChange={handleChange}
      />
    </div>
    <div className="mb-3 text-center">
      <label htmlFor="password">Contraseña:</label>
      <input
        className="form-control text-center"
        type="password"
        id="password"
        name="password"
        required
        value={form.password}
        onChange={handleChange}
      />
    </div>
    <div className="text-center">
      <button className="btn btn-light text-dark mt-2" type="submit">Iniciar sesión</button>
    </div>
  </form>

  {error && (
    <div className="alert alert-danger text-center mt-3" role="alert">
      {error}
    </div>
  )}

  <p className="text-center mt-3">
    ¿No tienes una cuenta? <Link className="text-light" to="/registro">Regístrate aquí</Link>
  </p>
  <p className="text-center mb-1">
    <Link className="text-light" to="/">Volver a la página principal</Link>
  </p>
</div>
  );
} 