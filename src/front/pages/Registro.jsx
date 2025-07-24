import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export const Registro = () => {

  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate();
  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          username: form.username // <-- Agrega este campo
        })
      });
      const data = await resp.json();
      if (resp.ok) {
        setSuccess("¡Registro exitoso! Redirigiendo...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data.message || "Error en el registro.");
      }
    } catch (err) {
      setError("Error de conexión.");
    }
  };

  return (
    <div>
      <h1 className="text-center mb-5">¡Bienvenido a PatitasClub!</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 text-center">
          <label htmlFor="username">Nombre de usuario:</label>
          <input className="form-control" type="text" id="username" name="username" required value={form.username} onChange={handleChange} />
        </div>
        <div className="mb-3 text-center">
          <label htmlFor="email">Correo electrónico:</label>
          <input className="form-control" type="email" id="email" name="email" required value={form.email} onChange={handleChange} />
        </div>
        <div className="mb-3 text-center">
          <label htmlFor="password">Contraseña:</label>
          <input className="form-control" type="password" id="password" name="password" required value={form.password} onChange={handleChange} />
        </div>
        <div className="mb-3 text-center">
          <label htmlFor="confirmPassword">Confirmar contraseña:</label>
          <input className="form-control" type="password" id="confirmPassword" name="confirmPassword" required value={form.confirmPassword} onChange={handleChange} />
        </div>
        {error && <div className="text-danger text-center">{error}</div>}
        {success && <div className="text-success text-center">{success}</div>}
        <div className="text-center">
          <button className="btn btn-primary mt-2" type="submit">Registrarse</button>
        </div>
      </form>
      <p className="text-center mt-3">
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
      <p className="text-center mb-1">
        <Link to="/">Volver a la página principal</Link>
      </p>
    </div>
  );








};


