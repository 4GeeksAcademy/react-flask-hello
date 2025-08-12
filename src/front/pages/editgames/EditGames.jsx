import { useParams } from "react-router-dom"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { useEffect, useState } from "react"



export const EditGames = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const { store, dispatch } = useGlobalReducer()
    const { id } = useParams()
    const { all_games } = store

    const [img, setImg] = useState("")
    const [video, setVideo] = useState("")
    const [name, setName] = useState("")
    const [platform, setPlatform] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [distribuidora, setDistribuidora] = useState("")
    const [genero, setGenero] = useState("")
    const [online, setOnline] = useState("")
    const [offline, setOffline] = useState("")
    const [gamemode, setGamemode] = useState("")


    const gamefind = all_games.find(game => game.id === parseInt(id))
    console.log(gamefind)
    console.log ("prueba juego")

    useEffect(() => {
        if (gamefind) {
            setImg(gamefind.img)
            setVideo(gamefind.video)
            setName(gamefind.name)
            setPlatform(gamefind.platform)
            setDescription(gamefind.description)
            setPrice(gamefind.price)
            setDistribuidora(gamefind.distribuidora)
            setGenero(gamefind.genero)
            setOnline(gamefind.online)
            setOffline(gamefind.offline)
            setGamemode(gamefind.gamemode)

        }

    }, [gamefind])

    const updateGame = async (e) =>{
        try {
            e.preventDefault();

            const newgame = {
                "img": img,
                "video": video,
                "name": name,
                "platform": platform,
                "description": description,
                "price": price,
                "distribuidora": distribuidora,
                "genero": genero,
                "offline": offline,
                "online": online,
                "gamemode": gamemode
            }
            await fetch(`${backendUrl}api/games/EditGames/${id}`, {
                method: "PUT",
                body: JSON.stringify(newgame),
                headers: { "Content-type": "application/json" }
            })
            alert("Juego editado correctamente")
        } catch (error) {
            console.log("error al editar juego")
        }
    }

    return (

        <form class="w-full max-w-lg mx-auto" onSubmit={(e) => updateGame(e)}>

            <h1> Editar Juegos </h1>
            <div>
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-img">
                    Img
                </label>
                <input value={img} onChange={(e) => setImg(e.target.value)} class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="text" placeholder=""></input>

            </div>
            <div>
                <img></img>
            </div>
            <div>
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-img">
                    Video
                </label>
                <input value={video} onChange={(e) => setVideo(e.target.value)} class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="text" placeholder=""></input>
            </div>

            <div class="flex flex-col space-y-4 mt-6">
                <div>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                        Name
                    </label>
                    <input value={name} onChange={(e) => setName(e.target.value)} class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="text" placeholder=""></input>
                </div>

                <div>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-platform">
                        Platform
                    </label>
                    <select value={platform} onChange={(e) => setPlatform(e.target.value)} class="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded focus:outline-none focus:bg-white focus:border-gray-500" id="grid-plataform">
                        <option>None</option>
                        <option>PS4</option>
                        <option>PS5</option>
                        <option>Xbox Serie S/X</option>
                        <option>Xbox One</option>
                        <option>Nintendo Switch</option>
                        <option>Nintendo Switch2</option>
                        <option>PC</option>
                    </select>
                </div>

                <div>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-platform">
                        Modo de Juego
                    </label>
                    <select value={gamemode} onChange={(e) => setGamemode(e.target.value)} class="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded focus:outline-none focus:bg-white focus:border-gray-500" id="grid-plataform">
                        <option>None</option>
                        <option>Juego Online</option>
                        <option>Juego Offline</option>
                        <option>Juego Online opcional</option>
                        <option>Juego Online obligatorio</option>
                    </select>
                </div>
                <div>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-platform">
                        Género de Juego
                    </label>
                    <select value={genero} onChange={(e) => setGenero(e.target.value)} class="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded focus:outline-none focus:bg-white focus:border-gray-500" id="grid-plataform">
                        <option>Acción</option>
                        <option>Aventura</option>
                        <option>Deportes</option>
                        <option>Estrategia</option>
                        <option>Rol (RPG)</option>
                        <option>Simulación</option>
                        <option>Puzzles</option>
                    </select>
                </div>
                <div>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="jugadores Offline">
                        Nº Jugadores Offline
                    </label>
                    <input type="number" min={1} max={10} value={offline}  onChange={(e) => setOffline(e.target.value)} class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-price" placeholder="num jugadores"></input>
                </div>
                <div>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="jugadores Online">
                        Nº Jugadores Online
                    </label>
                    <input type="number" min={1} max={10} value={online} onChange={(e) => setOnline(e.target.value)} class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-price" placeholder="num jugadores"></input>
                </div>
                <div>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-img">
                        Distribuidora
                    </label>
                    <input value={distribuidora} onChange={(e) => setDistribuidora(e.target.value)} class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="text" placeholder=""></input>

                </div>

                <div>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-description">
                        Description
                    </label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 h-32 resize-none focus:outline-none focus:bg-white focus:border-gray-500" id="grid-description" placeholder=""></textarea>
                </div>

                <div>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-price">
                        Price
                    </label>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-price" type="text" placeholder="€"></input>
                </div>
            </div>
            <button
                type="submit"
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
            >
                Editar juego
            </button>
        </form>
    )
}
