import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserByUsername } from "../mock/users";

export default function ProfilePublic() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setErr("");
    setLoading(true);
    getUserByUsername(username)
      .then(setUser)
      .catch(e => setErr(e.message || "Error cargando perfil"))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <div className="container py-5">Cargando perfil…</div>;
  if (err) return (
    <div className="container py-5">
      <p style={{ color: "#b91c1c" }}>Error: {err}</p>
      <Link to="/">Volver</Link>
    </div>
  );
  if (!user) return null;

  return (
    <div className="container py-4" style={{ maxWidth: 960 }}>
      <div
        className="card"
        style={{
          borderRadius: 16,
          padding: "1.5rem",
          boxShadow: "0 8px 24px rgba(0,0,0,.06)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: "#eef2ff",
              display: "grid",
              placeItems: "center",
              fontSize: 28,
              color: "#4338ca",
              flexShrink: 0,
            }}
          >
            {user.username?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h1 style={{ margin: 0 }}>
              {user.username}
              {" "}
              <span style={{ fontSize: 14, color: "#6b7280", fontWeight: 400 }}>
                @{user.username}
              </span>
            </h1>
            <div style={{ color: "#6b7280", marginTop: 4 }}>
              {user.location || "Sin ubicación"}
            </div>
            {!!user.roles?.length && (
              <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {user.roles.map(r => (
                  <span
                    key={r}
                    style={{
                      background: "#eef2ff",
                      color: "#4338ca",
                      padding: "2px 10px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {r}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div style={{ marginTop: 16, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Stat label="Reviews" value={user.stats?.reviews ?? 0} />
          <Stat label="Rating" value={user.stats?.rating ?? 0} />
          <Stat label="Tareas completadas" value={user.stats?.tasks_done ?? 0} />
        </div>

        {/* Bio */}
        {(user.tagline || user.bio) && (
          <div style={{ marginTop: 20 }}>
            {user.tagline && (
              <p style={{ margin: 0, fontWeight: 600 }}>{user.tagline}</p>
            )}
            {user.bio && (
              <p style={{ margin: "6px 0 0 0", color: "#4b5563", lineHeight: 1.6 }}>
                {user.bio}
              </p>
            )}
          </div>
        )}

        {/* Placeholder: tareas / portafolio */}
        <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid #eee" }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>Actividad reciente</h3>
          <p style={{ color: "#6b7280" }}>Aún sin mostrar tareas/portafolio (MVP).</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div
      style={{
        background: "#f9fafb",
        border: "1px solid #f3f4f6",
        borderRadius: 12,
        padding: "10px 14px",
        minWidth: 140,
      }}
    >
      <div style={{ fontSize: 12, color: "#6b7280" }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700 }}>{value}</div>
    </div>
  );
}