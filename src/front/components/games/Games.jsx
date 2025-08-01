import { useEffect } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import "./games.css";

export const Games = () => {
  const { store, dispatch } = useGlobalReducer();
  const { all_games } = store;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    getGames();
    console.log(all_games);
  }, []);

  const getGames = async () => {
    try {
      const responsive = await fetch(`${backendUrl}api/games`);
      const data = await responsive.json();
      console.log(data);
      dispatch({
        type: "setGames",
        payload: data.games,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="games-container">
      {all_games.map((game, index) => (
        <div key={index} className="game-card">
          <img src={game.img} alt={game.name} />
          <div className="game-card-content">
            <h3>The Coldest Sunset</h3>
            <p>{game.name}</p>
            <p>{game.platform}</p>
            <p>{game.price}</p>
          </div>
          <div className="game-card-footer">
            <button>Añadir</button>
          </div>
        </div>
      ))}
    </div>
  );
};
