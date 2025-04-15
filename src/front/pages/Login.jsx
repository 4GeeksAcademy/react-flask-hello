import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await resp.json();
    if (resp.ok) {
      localStorage.setItem("token", data.access_token);
      dispatch({ type: "set_user", payload: data.user });
      navigate("/profile");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="container">
      <h2>Iniciar sesión</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="form-control mb-2" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" className="form-control mb-2" />
      <button onClick={handleLogin} className="btn btn-primary">Entrar</button>
    </div>
  );
};