const BASE = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "");

export async function getProfile(userId) {
  const r = await fetch(`${BASE}/api/users/${userId}/profile`);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function createProfile(userId, data = {}) {
  const r = await fetch(`${BASE}/api/users/${userId}/profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function updateProfile(userId, data) {
  const r = await fetch(`${BASE}/api/users/${userId}/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}