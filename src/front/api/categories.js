const BASE = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "");

export async function listCategories() {
  const r = await fetch(`${BASE}/api/categories`);
  if(!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function createCategory(name) {
  const r = await fetch(`${BASE}/api/categories`, {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify({ name })
  });
  if(!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function attachCategoryToTask(taskId, category_id) {
  const r = await fetch(`${BASE}/api/tasks/${taskId}/categories`, {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify({ category_id })
  });
  if(!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function detachCategoryFromTask(taskId, category_id) {
  const r = await fetch(`${BASE}/api/tasks/${taskId}/categories`, {
    method: "DELETE",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify({ category_id })
  });
  if(!r.ok) throw new Error(await r.text());
  return r.json();
}