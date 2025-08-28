// src/front/api/tasks.js
const BASE = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "");

// GET /api/tasks
export async function listTasks() {
  const res = await fetch(`${BASE}/api/tasks`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// GET /api/tasks/:id
export async function getTask(id) {
  const res = await fetch(`${BASE}/api/tasks/${id}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// GET /api/users/:user_id/tasks
export async function getTasksByUser(userId, { status, from_date, to_date } = {}) {
  const qs = new URLSearchParams();
  if (status) qs.set("status", status);
  if (from_date) qs.set("from_date", from_date);
  if (to_date) qs.set("to_date", to_date);

  const url = `${BASE}/api/users/${userId}/tasks${qs.toString() ? `?${qs}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// POST /api/tasks
export async function createTask(payload) {
  const res = await fetch(`${BASE}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}