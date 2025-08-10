import { useEffect } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../store/appContext";
import "./games.css";

export const Games = () => {
  const { store, dispatch } = useGlobalReducer();
  const { all_games } = store;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const moreInfoGame = (id) => {
    navigate(`/DetailsGames/${id}`);
  };

  useEffect(() => {
    getGames();
  }, []);

  const getGames = async () => {
    try {
      const response = await fetch(`${backendUrl}api/games`);
      const data = await response.json();
      dispatch({
        type: "setGames",
        payload: data.all_games,
      });
    } catch (error) {
      console.log(error);
    } z
  };

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {all_games.map((game, index) => (
        <div
          key={index}
          className="card w-1/4 pb-2 rounded overflow-hidden shadow-lg bg-gray-800"
        >
          <img
            onClick={() => moreInfoGame(game.id)}
            className="w-full h-64 object-cover object-center"
            src={game.img}
            alt={game.name}
          />
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

          {/* ---- boton para añadir al carro ---- */}
          <div className="px-6 pb-4">
            <button
              className=" w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => dispatch({ type: "addToCarro", payload: game })}
            >
              Agregar al carro
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
