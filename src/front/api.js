// src/front/api.js
const BASE = (
  import.meta.env?.VITE_BACKEND_URL ||
  process.env?.BACKEND_URL ||
  ""
).replace(/\/$/, "");

function url(path) {
  if (!BASE) {
    // Fallback for local dev — change to your dev server if needed
    return `http://localhost:3001${path}`;
  }
  return `${BASE}${path}`;
}

export async function login({ email, password }) {
  const resp = await fetch(url("/api/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  let data;
  try {
    data = await resp.json();
  } catch {
    /* ignore */
  }

  if (!resp.ok) {
    // Try to show server message if available
    const msg =
      (data && (data.msg || data.message)) || `Login failed (${resp.status})`;
    throw new Error(msg);
  }
  // Expect: { token, user }
  return data;
}
