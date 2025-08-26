// src/front/pages/Home.jsx
import { useEffect, useState } from "react";
import { useStore } from "../hooks/useGlobalReducer";

export default function Home(){
  const { store } = useStore();
  const [msg, setMsg] = useState("Cargando...");

  useEffect(() => {
    const BASE = import.meta.env.VITE_BACKEND_URL;
    fetch(`${BASE}/api/hello`)
      .then(r => r.json())
      .then(d => setMsg(d.message || JSON.stringify(d)))
      .catch(err => setMsg("Error: " + err.message));
  }, []);

  return (
    <div className="card" style={{maxWidth: 600, margin: "2rem auto"}}>
      <h2>Tasky – Home</h2>
      <p>Backend dice: <b>{msg}</b></p>
      <p>VITE_BACKEND_URL: {import.meta.env.VITE_BACKEND_URL}</p>
      {store.user && <p>Sesión: {store.user.email} (rol: {store.user.role})</p>}
    </div>
  );
}