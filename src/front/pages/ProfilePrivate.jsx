import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../hooks/useGlobalReducer";

// crea un slug url-friendly
const slugify = (txt = "") =>
  txt.toLowerCase()
    .trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function ProfilePrivate() {
  const { store, actions } = useStore();
  const nav = useNavigate();

  const user = store.user || {
    name: "",
    lastName: "",
    email: "",
    city: "",
    tagline: "",
    bio: "",
    username: "",
    skills: [],
  };

  const [form, setForm] = useState(user);

  // username sugerido a partir de name/email si no existe
  const username = useMemo(() => {
    if (form.username) return slugify(form.username);
    if (form.name) return slugify(form.name);
    if (user.username) return slugify(user.username);
    if (user.email) return slugify(user.email.split("@")[0]);
    return "user";
  }, [form.username, form.name, user.username, user.email]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSave = () => {
    const next = { ...form, username };
    actions.login(next); // persiste en store/localStorage (mock por ahora)
    alert("Perfil actualizado");
  };

  const goPublic = () => nav(`/u/${username}`);

  return (
    <div className="acc-wrap">
      <aside className="acc-aside">
        <div className="acc-avatar" />
        <div className="acc-menu">
          <a>Home</a>
          <a>My Tasker Dashboard</a>
          <a>Payment methods</a>
          <a>Notifications</a>
          <a>Settings</a>
        </div>
      </aside>

      <main className="acc-main">
        <header className="acc-header">
          <div>
            <h1>Account</h1>
            <p>Modify your public profile</p>
          </div>
          <button className="btn-outline" onClick={goPublic}>
            View your public profile
          </button>
        </header>

        <div className="grid-2">
          <div>
            <label>First name</label>
            <input value={form.name || ""} onChange={set("name")} />
          </div>
          <div>
            <label>Last name</label>
            <input value={form.lastName || ""} onChange={set("lastName")} placeholder="(opcional)" />
          </div>
        </div>

        <label>Tagline</label>
        <input
          value={form.tagline || ""}
          onChange={set("tagline")}
          placeholder="Mini bio (ej. Técnico electricista con 5 años de experiencia)"
        />

        <label>Location</label>
        <input value={form.city || ""} onChange={set("city")} placeholder="Ciudad, País" />

        <label>Email</label>
        <input value={form.email || ""} disabled />

        <label>Description</label>
        <textarea
          rows={5}
          value={form.bio || ""}
          onChange={set("bio")}
          placeholder="Cuentanos tu experiencia, herramientas, disponibilidad…"
        />

        <div className="acc-actions">
          <button className="btn-primary" onClick={handleSave}>Save profile</button>
          <button className="btn-danger" onClick={actions.logout}>Log out</button>
        </div>

        <div className="acc-meta">
          <small>Username (preview): <b>{username}</b> — URL pública: <code>/u/{username}</code></small>
        </div>
      </main>
    </div>
  );
}