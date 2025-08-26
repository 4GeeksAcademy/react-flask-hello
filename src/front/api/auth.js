// src/front/api/auth.js
const USE_MOCK = true; // cambia a false cuando conectes al back real
const BASE = import.meta.env.VITE_BACKEND_URL;

export async function apiRegister({ name, email, password, role }) {
  if (USE_MOCK) return { id: 1, name, email, role: role || "client", token: "mock" };

  const res = await fetch(`${BASE}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiLogin({ email, password }) {
  if (USE_MOCK) return { id: 1, name: "Demo", email, role: "client", token: "mock" };

  const res = await fetch(`${BASE}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}