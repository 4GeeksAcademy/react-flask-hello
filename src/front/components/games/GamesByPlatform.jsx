import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const rawBackend = import.meta.env.VITE_BACKEND_URL || "/";
const backendUrl = rawBackend.endsWith("/") ? rawBackend : `${rawBackend}/`;

export default function GamesByPlatform() {
  const { platform } = useParams();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const url = `${backendUrl}api/games/platform/${encodeURIComponent(platform)}`;
        const res = await fetch(url);

        if (!res.ok) {
          // backend puede devolver 200 con {games: []}, pero por si acaso:
          const text = await res.text();
          throw new Error(`HTTP ${res.status} - ${text || "Error al cargar juegos"}`);
        }

        const data = await res.json();
        if (isMounted) setGames(Array.isArray(data.games) ? data.games : []);
      } catch (e) {
        console.error(e);
        if (isMounted) {
          setGames([]);
          setError("No se pudieron cargar los juegos. Intenta de nuevo.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => { isMounted = false; };
  }, [platform, backendUrl]);

  if (loading) return <div className="p-6">Cargando...</div>;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl mb-4">Juegos · {platform}</h1>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {games.length === 0 ? (
        <p>No hay juegos para esta plataforma.</p>
      ) : (
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <li
              key={g.id}
              className="p-4 rounded-xl shadow bg-white/5 border border-white/10"
            >
              <h3 className="font-semibold">{g.name}</h3>
              <p className="text-sm opacity-80">{g.platform}</p>
              {/* Si tu API devuelve img/price, muéstralos aquí */}
              {/* {g.img && <img src={g.img} alt={g.name} className="mt-2 rounded-lg" />} */}
              {/* {g.price && <p className="mt-2 text-sm">€{g.price}</p>} */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}