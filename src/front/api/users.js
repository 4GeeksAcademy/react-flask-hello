// src/front/api/users.js
const BASE = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "");

// Helper genérico para fetch + manejo de errores
async function fetchJSON(input, init) {
  const r = await fetch(input, { credentials: "include", ...init });
  let payload = null;
  try { payload = await r.json(); } catch { /* puede ser texto/void */ }
  if (!r.ok) {
    const msg =
      (payload && (payload.error || payload.message)) ||
      r.statusText ||
      "Request failed";
    throw new Error(msg);
  }
  return payload ?? {};
}

// ---------- USERS ----------
export function listUsers() {
  return fetchJSON(`${BASE}/api/users`);
}

export function getUser(id) {
  return fetchJSON(`${BASE}/api/users/${id}`);
}

export function getUserByUsername(username) {
  return fetchJSON(`${BASE}/api/users/by-username/${encodeURIComponent(username)}`);
}

export function createUser({ email, password, username }) {
  return fetchJSON(`${BASE}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
  });
}

export function updateUser(id, data) {
  return fetchJSON(`${BASE}/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function deleteUser(id) {
  return fetchJSON(`${BASE}/api/users/${id}`, { method: "DELETE" });
}

// ---------- PROFILE ----------
export function getUserProfile(userId) {
  return fetchJSON(`${BASE}/api/users/${userId}/profile`);
}

export function updateProfile(userId, data) {
  return fetchJSON(`${BASE}/api/users/${userId}/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}