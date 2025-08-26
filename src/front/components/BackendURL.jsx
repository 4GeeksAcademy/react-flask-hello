export function BackendURL() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Configura tu VITE_BACKEND_URL</h2>
      <p>Agrega en tu .env (front):</p>
      <pre>VITE_BACKEND_URL=https://…tu-backend…-3001.app.github.dev</pre>
    </div>
  );
}