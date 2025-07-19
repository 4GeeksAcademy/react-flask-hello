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

    const resp = await fetch("FALTA LINK", {
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
=======
import { Link } from "react-router-dom";

export const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(form); // aquí meteré el fetch al navbar©
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>

            <p>
                No estás registrado?{" "}
                <Link to="/register">
                    <button type="button">Clic aquí</button>
                </Link>
            </p>
        </>
    );
};