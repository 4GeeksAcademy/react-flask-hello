import { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../store/appContext";
import "./games.css";
import { HeartPlus, Trash, Pencil } from 'lucide-react';



export const Games = () => {
  const { store, dispatch } = useGlobalReducer();
  const { all_games } = store;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const token_user = localStorage.getItem('jwt-token');
  const user = localStorage.getItem('user');
  const [view, setview] = useState(false)

  const addFavorite = (data) => {
    dispatch({
      type: 'setFavorites',
      payload: data
    })
  }

  const moreInfoGame = (id) => {
    navigate(`/DetailsGames/${id}`);
  };

  const modgame = (id) => {
    navigate(`/EditGames/${id}`)
  }
  useEffect(() => {
    if (user) {
      let parseUser = JSON.parse(user)
      if (parseUser.is_admin) {
        setview(true)
      }
    } else {
      setview(false)
    }
    console.log("hola", user, "Asdasd")
  }, [token_user]);

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
    }
  };


  const deleteGame = async (id) => {
    try {
      await fetch(`${backendUrl}/api/games/${id}`, {
        method: "DELETE"
      })
      getGames();
      alert("Juego eliminado correctamente")
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {all_games.map((game, index) => (
        <div
          key={index}
          className="card sm:w-1/2 lg:w-1/4pb-2 rounded overflow-hidden shadow-lg bg-gray-800"
        >
          <div className="w-full container-img ">
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
          {
            token_user && (
              <div className="px-6 pb-4 ">
                <button
                  className=" w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() => dispatch({ type: "addToCarro", payload: game })}
                >
                  Agregar al carro
                </button>
              </div>
            )}
          {/* ---- boton para añadir al carro ---- */}
          <div>
            <button className="" onClick={() => addFavorite(game)} >
              <HeartPlus size={24} color="#ff0000ff" strokeWidth={2} />
            </button>
          </div>
          {
            view && (
              <div className="px-6 pb-4 flex justify-around text-white">
                <div>
                  <button onClick={() => modgame(game.id)}>
                    <Pencil size={24} color="#ffffff" strokeWidth={1.75} />
                  </button>

                </div>
                <div>
                  <button onClick={() => deleteGame(game.id)} >
                    <Trash size={24} color="#ffffff" strokeWidth={1.75} />
                  </button>
                </div>

              </div>
            )}

        </div>
      ))}
    </div>
  );
}

