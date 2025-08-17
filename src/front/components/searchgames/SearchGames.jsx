import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const backendUrl = "https://refactored-couscous-x5p76ppwgq5v3xxr-3001.app.github.dev/"; // Cada uno tiene que poner su url de su backend hasta tener BD común

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`${backendUrl}api/games/search?query=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => setResults(data))
        .catch(err => console.error("Error al buscar:", err));
    }
  }, [query]);

  return (
    <div>
      <h2>Resultados para: {query}</h2>
      {results.length > 0 ? (
        <ul>
          {results.map(game => (
            <li key={game.id}>{game.name}</li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
}