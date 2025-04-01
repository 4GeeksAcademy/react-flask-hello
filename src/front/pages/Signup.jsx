// 👇 ❇️ Riki for the group success 👊

import React, { useState } from "react";

export const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
    dni: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Usuario registrado con éxito ✅");
      } else {
        setMessage(data.error || "Error al registrar");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error en el servidor");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} className="form-control mb-2" />
        <input name="name" placeholder="Nombre" onChange={handleChange} className="form-control mb-2" />
        <input name="lastname" placeholder="Apellido" onChange={handleChange} className="form-control mb-2" />
        <input name="dni" placeholder="DNI" onChange={handleChange} className="form-control mb-2" />
        <button className="btn btn-success">Registrarse</button>
      </form>
      <p className="mt-2">{message}</p>
    </div>
  );
};
