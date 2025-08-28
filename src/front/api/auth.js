import { getBackendURL } from "../components/BackendURL";

const USE_MOCK = true;
const BASE = getBackendURL?.() || import.meta.env.VITE_BACKEND_URL || "";

export async function apiRegister({ name, email, password, role }) {
  if (USE_MOCK) return { id: 1, name, email, role: role || "client", token: "mock" };
  const res = await fetch(`${BASE}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiLogin({ email, password }) {
  if (USE_MOCK) return { id: 1, name: "Demo", email, role: "client", token: "mock" };
  const res = await fetch(`${BASE}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}


export async function apiGoogleLogin(idToken) {
  if (USE_MOCK) {
    return {
      id: 101,
      name: "Demo Google",
      email: "demo.google@example.com",
      role: "client",
      token: "mock-google",
      provider: "google"
    };
  }
  const res = await fetch(`${BASE}/api/login/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token: idToken }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiFacebookLogin(accessToken) {
  if (USE_MOCK) {
    return {
      id: 102,
      name: "Demo Facebook",
      email: "demo.facebook@example.com",
      role: "client",
      token: "mock-facebook",
      provider: "facebook"
    };
  }
  const res = await fetch(`${BASE}/api/login/facebook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ access_token: accessToken }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}