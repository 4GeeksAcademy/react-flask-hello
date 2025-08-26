import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Usa una de las dos opciones:
import { getUserByUsername } from "../api/users";
// import { getPublicProfile } from "../api/users";

export default function ProfilePublic() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        setError("");
        setUser(null);
        // Opción A:
        const data = await getUserByUsername(username);
        // Opción B:
        // const data = await getPublicProfile(username);
        if (live) setUser(data);
      } catch (e) {
        if (live) setError(e.message || "Error cargando perfil");
      }
    })();
    return () => { live = false; };
  }, [username]);

  if (error) return <div className="container py-4">Error: {error}</div>;
  if (!user) return <div className="container py-4">Cargando perfil…</div>;

  return (
    <div className="container py-4">
      <h1>{user.first_name} {user.last_name}</h1>
      <p>@{user.username}</p>
      <p>{user.tagline}</p>
      <p>{user.location}</p>
      <p>{user.description}</p>
    </div>
  );
}