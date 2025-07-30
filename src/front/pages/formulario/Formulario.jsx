import { useState } from "react"


export const Formulario = () => {

    const [img, setImg] = useState("")
    const [name, setName] = useState("")
    const [platform, setPlatform] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newgame = {
            "img": img,
            "name": name,
            "platform": platform,
            "description": description,
            "price": price,
        }
        await fetch ("https://redesigned-yodel-55qqq4gvv7xh459v-3001.app.github.dev/api")
    };

    return (
        <form class="w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div>
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-img">
                    Img
                </label>
                <input value={img} onChange={(e) => setImg(e.target.value)} class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="text" placeholder=""></input>

            </div>
            <div>
                <img src={img}></img>
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
                        <option>PlayStation</option>
                        <option>Xbox</option>
                        <option>Nintendo</option>
                        <option>Juegos de Mesa</option>
                    </select>
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
                Agregar juego
            </button>
        </form>
    );
}