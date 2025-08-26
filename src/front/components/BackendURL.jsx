// src/front/components/BackendURL.jsx
export function getBackendURL() {
  const url = import.meta.env.VITE_BACKEND_URL || ""
  // quita slash al final (opcional)
  return url.replace(/\/$/, "")
}

export function BackendURL() {
  // ... tu UI que ayuda a setear VITE_BACKEND_URL
  return <div>Configura VITE_BACKEND_URL…</div>
}

// 👇 con esto, podrás hacer import default getBackendURL ...
export default getBackendURL
