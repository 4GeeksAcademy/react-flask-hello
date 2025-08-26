const BASE = import.meta.env.VITE_BACKEND_URL?.replace(/\/+$/, "") || "";

async function safeJson(res) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { message: text || "Error" }; }
}

export async function getUserByUsername(username) {
  const url = `${BASE}/api/users/${encodeURIComponent(username)}`;
  try {
    const res = await fetch(url, { credentials: "include" });
    if (!res.ok) {
      const body = await safeJson(res);
      throw new Error(body.message || `HTTP ${res.status}`);
    }
    return res.json();
  } catch (err) {
    // Fallback a mock en desarrollo si el fetch falló (CORS / backend caído)
    if (import.meta.env.DEV) {
      const mock = await import("../mock/users");
      return mock.getUserByUsername(username);
    }
    throw err;
  }
}
