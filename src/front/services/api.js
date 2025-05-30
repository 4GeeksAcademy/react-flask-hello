const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchPosts = async () => {
  const res = await fetch(`${BASE_URL}/events/`);
  if (!res.ok) throw new Error("Error al obtener eventos");
  return res.json();
};

export const createEvent = async (data) => {
  const res = await fetch(`${BASE_URL}/events/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear evento");
  return res.json();
};
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear usuario");
  return res.json();
};
export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) throw new Error("Error al iniciar sesion");
  return res.json();
};
