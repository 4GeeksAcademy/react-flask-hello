// src/front/pages/Home.jsx
import { useEffect, useMemo, useState } from "react";
import { useStore } from "../hooks/useGlobalReducer";

export default function Home() {
  const { store } = useStore();
  const [msg, setMsg] = useState("Cargando...");

  // Normaliza y memoriza BASE (sin slash final)
  const BASE = useMemo(
    () => (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, ""),
    []
  );

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {
        const url = `${BASE}/api/health`;
        const r = await fetch(url, { signal: ctrl.signal });
        if (!r.ok) {
          const text = await r.text().catch(() => "");
          throw new Error(`HTTP ${r.status} – ${text || "Request failed"}`);
        }
        const data = await r.json();
        setMsg(data.msg || JSON.stringify(data));
      } catch (err) {
        if (err.name !== "AbortError") setMsg(`Error: ${err.message}`);
      }
    })();

    return () => ctrl.abort();
  }, [BASE]);

  return (
    <div className="card" style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Tasky – Home</h2>
      <p>
        Backend dice: <b>{msg}</b>
      </p>
      <p>VITE_BACKEND_URL: {import.meta.env.VITE_BACKEND_URL}</p>
      {store.user && (
        <p>
          Sesión: {store.user.email} (rol: {store.user.role})
        </p>
      )}
    </div>
  );
}