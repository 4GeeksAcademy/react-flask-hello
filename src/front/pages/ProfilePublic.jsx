// src/front/pages/ProfilePublic.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserByUsername, getUserProfile } from "../api/users";
import "./profile-public.css";

export default function ProfilePublic() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const u = await getUserByUsername(username);
        setUser(u);
        try {
          const p = await getUserProfile(u.id);
          setProfile(p);
        } catch {
          setProfile(null);
        }
      } catch (e) {
        setError(e.message || "Usuario no encontrado");
      }
    })();
  }, [username]);

  if (error) {
    return (
      <div className="container">
        <div className="profile-card"><p className="error">{error}</p></div>
        <Link to="/" className="back">Volver</Link>
      </div>
    );
  }

  if (!user) return <div className="container"><div className="profile-card">Cargando...</div></div>;

  const name = `${profile?.name || user.username}${profile?.last_name ? " " + profile.last_name[0] + "." : ""}`;
  const city = profile?.city || "—";
  const email = user.email;
  const rating = profile?.rating_avg ?? 0;
  const bio = profile?.bio || "Sin descripción aún.";
  const skills = (profile?.skills || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  return (
    <div className="container">
      <article className="profile-card">
        {/* Cover */}
        <div className="cover" />

        {/* Header: avatar + name */}
        <header className="header">
          <img
            className="avatar"
            src={profile?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=2563eb&color=fff`}
            alt={user.username}
            loading="lazy"
          />
          <div className="title">
            <h1>{name}</h1>
            <div className="meta">
              <span>{city}</span>
              <span className="dot">•</span>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
            <div className="rating">
              <span className="stars">{renderStars(rating)}</span>
              <span className="rating-n">{rating ? rating.toFixed(1) : "Nuevo"}</span>
            </div>
          </div>
          <div className="actions">
            <Link to="/browse" className="btn">Browse tasks</Link>
          </div>
        </header>

        {/* Content: left info / right sidebar */}
        <div className="grid">
          <section className="section">
            <h2>About</h2>
            <p className="about">{bio}</p>

            <h2>Skills</h2>
            <div className="chips">
              {skills.length ? skills.map((s, i) => (
                <span key={i} className="chip">{s}</span>
              )) : <span className="muted">Aún no hay skills</span>}
            </div>
          </section>

          <aside className="sidebar">
            <div className="card">
              <h3>Verificado</h3>
              <ul className="checks">
                <li>✓ Email</li>
                <li>✓ Cuenta creada</li>
              </ul>
            </div>

            <div className="card">
              <h3>Contacto</h3>
              <a className="btn btn-outline" href={`mailto:${email}`}>Enviar correo</a>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}

function renderStars(value) {
  const v = Math.max(0, Math.min(5, Number(value || 0)));
  const full = Math.floor(v);
  const empty = 5 - full;
  return "★".repeat(full) + "☆".repeat(empty);
}