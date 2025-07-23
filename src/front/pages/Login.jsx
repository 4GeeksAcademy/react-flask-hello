import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setSending(true);

    const resp = await fetch("https://upgraded-meme-5g5q4q79g5gvhvg65-3001.app.github.dev/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await resp.json();

    if (resp.ok) {
      setMessage("Login exitoso.");
      setTimeout(() => navigate("/"), 2000); // o la ruta a tu dashboard
    } else {
      setError(data.msg || "Error al iniciar sesión.");
    }

    setSending(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange}required/>
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange}required/>
      </form>

      <p>
        No estás registrado?{" "}
        <Link to="/register">
          <button type="button">Clic aquí</button>
        </Link>
      </p>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};
