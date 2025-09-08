import { useNavigate, Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useState } from "react"
import { Trash } from 'lucide-react';

export const Favorites = () => {
    const { store, dispatch } = useGlobalReducer()
    const { favorites } = store
    const token_user = localStorage.getItem('jwt-token');
    const user = localStorage.getItem('user');
    const navigate = useNavigate()

    console.log(favorites)

    const moreInfoGame = (id) => {
        navigate(`/DetailsGames/${id}`);
    };
    const deleteFavorites = (id) => {
        dispatch({
            type: 'deleteFavorites',
            payload: id
        })
    }




    return (
        <div>
          <div className="text-center mt-10 bg-gray-900 p-10">
            <h1 className="text-white text-3xl">FAVORITES</h1>
          </div>
            <div className="flex flex-wrap justify-center gap-6 mt-10 mb-10">


                {favorites.map((favorite, index) => (
                    <div
                        key={index}
                        className="card sm:w-1/2 lg:w-1/4pb-2 rounded overflow-hidden shadow-lg bg-gray-800"
                    >
                        <div className="w-full container-img ">
                            <img
                                onClick={() => moreInfoGame(favorite.id)}
                                className="w-full h-64 object-cover"
                                src={favorite.img}
                                alt={favorite.name}
                            />
                        </div>

                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-white">{favorite.name}</div>
                            <p className="text-white text-base">Plataforma: {favorite.platform}</p>
                            <p className="text-white text-base">Precio: {favorite.price} €</p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            {favorite.name && (
                                <span className="inline-block bg-blue-800 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
                                    #{favorite.name.toLowerCase().replace(/\s+/g, "")}
                                </span>
                            )}
                            {favorite.platform && (
                                <span className="inline-block bg-blue-800 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
                                    #{favorite.platform.toLowerCase().replace(/\s+/g, "")}
                                </span>
                            )}
                            {favorite.genero && (
                                <span className="inline-block bg-blue-800 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
                                    #{favorite.genero.toLowerCase().replace(/\s+/g, "")}
                                </span>
                            )}
                        </div>
                        {
                            token_user && (
                                <div className="px-6 pb-4 ">
                                    <button
                                        className=" w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
                                        onClick={() => dispatch({ type: "addToCarro", payload: favorite })}
                                    >
                                        Agregar al carro
                                    </button>
                                </div>
                            )}
                        {/* ---- boton para añadir al carro ---- */}
                        <div className="px-6 pb-4 flex justify-around text-white">
                            <div>
                                <button onClick={() => deleteFavorites(favorite.id)} >
                                    <Trash size={24} color="#ffffff" strokeWidth={1.75} />
                                </button>
                            </div>
                        </div>


                    </div>
                ))}
            </div>

        </div>


    )
}