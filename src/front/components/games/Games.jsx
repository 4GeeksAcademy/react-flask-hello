import { useEffect } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import "./games.css"


export const Games = () => {
    const { store, dispatch } = useGlobalReducer();
    const { all_games } = store;
    const backendUrl = import.meta.env.VITE_BACKEND_URL


    useEffect(() => {
        getGames()
        console.log(all_games)
    }, [])


    const getGames = async () => {
        try {
            const responsive = await fetch(`${backendUrl}api/games`);
            const data = await responsive.json();
            console.log(data)
            dispatch({
                type: 'setGames',
                payload: data.games
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    return (

        <div class="flex flex-wrap justify-center gap-6">
            {
                all_games.map((game, index) => {
                    return (
                        <div class="max-w-sm pt-2 pb-2 rounded overflow-hidden shadow-none">
                            <img class="h-64 w-full object-cover" src={game.img}></img>
                            <div class="px-6 py-4">

                                <div class="font-bold text-xl mb-2 text-white">The Coldest Sunset</div>
                                <p class="text-white text-base"> {game.name} </p>
                                <p class="text-white text-base"> {game.platform} </p>
                                <p class="text-white text-base"> {game.price} </p>

                            </div>
                            <div class="px-6 pt-4 pb-2">
                               <button>Añadir</button>
                            </div>
                        </div>



                    )
                })
            }
        </div>

    )
}