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

        <div className="container mx-auto p-6">
            {
                all_games.map((game, index) => {
                    return (

                        

                    )
                })
            }
        </div>

    )
}