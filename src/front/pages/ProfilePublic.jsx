import { useParams } from "react-router-dom";
import { useStore } from "../hooks/useGlobalReducer";

export default function ProfilePublic() {
  const { username } = useParams();
  const { store } = useStore();

  // Para demo: si no hay user en store, render de ejemplo
  const user = store.user || {
    name: username,
    city: "Ciudad, País",
    tagline: "Nuevo en Tasky 🚀 listo para ayudarte.",
    bio: "Ofrezco servicios con enfoque en calidad y tiempos claros. ¡Hablemos!",
    skills: ["Limpieza", "Plomería", "Pintura"],
  };

  return (
    <div className="pub-wrap">
      <div className="pub-card">
        <div className="pub-header">
          <div className="pub-avatar" />
          <div className="pub-id">
            <h1>{user.name}</h1>
            <p className="muted">@{username}</p>
            <p>{user.city}</p>
          </div>
        </div>

        <div className="pub-body">
          {user.tagline && <p className="tagline">{user.tagline}</p>}
          {user.bio && <p className="bio">{user.bio}</p>}

          {user.skills?.length > 0 && (
            <div className="skills">
              {user.skills.map((s, i) => (
                <span key={i} className="chip">{s}</span>
              ))}
            </div>
          )}
        </div>

        <div className="pub-actions">
          <button className="btn-primary">Hire me</button>
          <button className="btn-outline">Message</button>
        </div>
      </div>
    </div>
  );
}