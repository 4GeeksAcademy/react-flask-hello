import { color } from "@cloudinary/url-gen/qualifiers/background";
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

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (form.username.length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres");
      return;
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      setError("Correo electrónico inválido");
      return;
    }
    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (form.confirmPassword.length < 6) {
      setError("La confirmación de contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (!/[A-Z]/.test(form.password)) {
      setError("Debe contener al menos una mayúscula");
      return;
    }
    if (!/[a-z]/.test(form.password)) {
      setError("Debe contener al menos una minúscula");
      return;
    }
    if (!/[0-9]/.test(form.password)) {
      setError("Debe contener al menos un número");
      return;
    }
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
          username: form.username
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
    <div className="container1 d-flex justify-content-start align-items-center flex-column ">
      <h1 className="text-center mb-3 title2">¡Bienvenido a PatitasClub!</h1>
      <form className="mx-auto" onSubmit={handleSubmit} style={{ maxWidth: "400px", color: "#EAE164" }}>
        <div className="mb-3 text-center">
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            className="form-control text-center "
            type="text"
            id="username"
            name="username"
            required
            value={form.username}
            onChange={handleChange}
          />
        </div>
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
        <div className="mb-3 text-center">
          <label htmlFor="confirmPassword">Confirmar contraseña:</label>
          <input
            className="form-control text-center"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && <div className="text-danger text-center">{error}</div>}
        {success && <div className="text-success text-center">{success}</div>}
        <div className="text-center">
          <button className="btn btn-light text-dark mt-2" type="submit">
            Registrarse
          </button>
        </div>
      </form>
      <p className="text-center mt-3 ">
        ¿Ya tienes una cuenta? <Link className="text-light" to="/login">Inicia sesión aquí</Link>
      </p>
      <p className="text-center mb-1">
        <Link className="text-light" to="/">Volver a la página principal</Link>
      </p>
    </div>
  );
}

