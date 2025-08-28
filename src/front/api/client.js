const BASE = import.meta.env.VITE_BACKEND_URL;

function getToken() {
  try {
    return JSON.parse(localStorage.getItem("tasky_user"))?.token || null;
  } catch {
    return null;
  }
}

export async function api(path, { method = "GET", body, headers } = {}) {
  if (!BASE) {
    throw new Error("VITE_BACKEND_URL no está configurada.");
  }

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const msg = data?.message || `${res.status} ${res.statusText}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}