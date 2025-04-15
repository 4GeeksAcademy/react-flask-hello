import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await resp.json();
    if (resp.ok) {
      alert("Usuario creado");
      navigate("/login");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="container">
      <h2>Registrarse</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="form-control mb-2" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" className="form-control mb-2" />
      <button onClick={handleRegister} className="btn btn-success">Crear cuenta</button>
    </div>
  );
};