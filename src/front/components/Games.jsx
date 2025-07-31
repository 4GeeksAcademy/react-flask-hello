import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";


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
        <div>
            {
                all_games.map((game, index) => {
                    return (
                        <div key={index}>

                            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                                <img class="w-full" src={game.img} alt="Imagen"/>
                                    <div class="px-6 py-4">
                                        <div class="font-bold text-xl mb-2">{game.name}</div>
                                        <p class="text-gray-700 text-base">{game.platform}</p>
                                        <p class="text-gray-700 text-base">{game.price}</p>
                                    </div>
                            </div>

                        </div>
                    )
                })
            }
        </div>

    )
}