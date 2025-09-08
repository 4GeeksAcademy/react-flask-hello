import { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useNavigate, useParams } from "react-router-dom";
import "./games.css";
import { Trash, Pencil } from "lucide-react";

export default function GamesByPlatform() {
  const { platform } = useParams();
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const rawBackend = import.meta.env.VITE_BACKEND_URL || "/";
  const backendUrl = rawBackend.endsWith("/") ? rawBackend : `${rawBackend}/`;

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState(false);

  const norm = (s) =>
    (s ?? "")
      .toString()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "") 
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ""); 

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parseUser = JSON.parse(user);
      setView(!!parseUser.is_admin);
    } else {
      setView(false);
    }
  }, []);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const url = `${backendUrl}api/games/platform/${encodeURIComponent(platform)}`;
        const res = await fetch(url);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status} - ${text || "Error al cargar juegos"}`);
        }
        const data = await res.json();

        const list = Array.isArray(data.games) ? data.games : [];
        // ✅ Filtro exacto usando norm
        const filtered = list.filter((g) => norm(g.platform) === norm(platform));

        if (alive) setGames(filtered);
      } catch (e) {
        console.error(e);
        if (alive) {
          setGames([]);
          setError("No se pudieron cargar los juegos. Intenta de nuevo.");
        }
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    return () => {
      alive = false;
    };
  }, [platform, backendUrl]);

  const moreInfoGame = (id) => navigate(`/DetailsGames/${id}`);
  const modgame = (id) => navigate(`/EditGames/${id}`);

  const refresh = async () => {
    try {
      const res = await fetch(`${backendUrl}api/games/platform/${encodeURIComponent(platform)}`);
      const data = await res.json();
      const list = Array.isArray(data.games) ? data.games : [];
      const filtered = list.filter((g) => norm(g.platform) === norm(platform));
      setGames(filtered);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteGame = async (id) => {
    try {
      await fetch(`${backendUrl}api/games/${id}`, { method: "DELETE" });
      await refresh();
      alert("Juego eliminado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <div className="p-6">Cargando...</div>;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #1a202c)",
        backgroundSize: "400% 400%",
        minHeight: "100vh",
        padding: "1.5rem",
        animation: "gradientShift 15s ease infinite",
      }}
    >
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <h1 className="text-2xl mb-4 text-white">Juegos por filtro, estás en · {platform}</h1>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-white">
          {error}
        </div>
      )}

      {games.length === 0 ? (
        <p className="text-white">No hay juegos para esta plataforma.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {games.map((game, index) => (
            <div
              key={index}
              className="card sm:w-1/2 lg:w-1/4 pb-2 rounded overflow-hidden shadow-lg bg-gray-800"
            >
              <div className="w-full container-img">
                <img
                  onClick={() => moreInfoGame(game.id)}
                  className="w-full h-64 object-cover"
                  src={game.img}
                  alt={game.name}
                />
              </div>

              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-white">{game.name}</div>
                <p className="text-white text-base">Plataforma: {game.platform}</p>
                <p className="text-white text-base">Precio: {game.price} €</p>
              </div>

              <div className="px-6 pt-4 pb-2">
                {game.name && (
                  <span className="inline-block bg-blue-800 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
                    #{game.name.toLowerCase().replace(/\s+/g, "")}
                  </span>
                )}
                {game.platform && (
                  <span className="inline-block bg-blue-800 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
                    #{game.platform.toLowerCase().replace(/\s+/g, "")}
                  </span>
                )}
                {game.genero && (
                  <span className="inline-block bg-blue-800 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
                    #{game.genero.toLowerCase().replace(/\s+/g, "")}
                  </span>
                )}
              </div>

              <div className="px-6 pb-4">
                <button
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() => dispatch({ type: "addToCarro", payload: game })}
                >
                  Agregar al carro
                </button>
              </div>

              {view && (
                <div className="px-6 pb-4 flex justify-around text-white">
                  <div>
                    <button onClick={() => modgame(game.id)}>
                      <Pencil size={24} color="#ffffff" strokeWidth={1.75} />
                    </button>
                  </div>
                  <div>
                    <button onClick={() => deleteGame(game.id)}>
                      <Trash size={24} color="#ffffff" strokeWidth={1.75} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}