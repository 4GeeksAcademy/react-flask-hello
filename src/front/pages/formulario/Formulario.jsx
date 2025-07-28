export const Formulario = () => {
    return (
        <form class="w-full max-w-lg mx-auto">
            <div class="pt-2 pb-2 rounded overflow-hidden">
                <img class="h-64 w-full object-cover rounded" src="https://www.xtrafondos.com/wallpapers/god-of-war-ragnarok-11256.jpg" alt="God of War Ragnarok"></img>
            </div>

            <div class="flex flex-col space-y-4 mt-6">
                <div>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                        Name
                    </label>
                    <input class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="text" placeholder=""></input>
                </div>

                <div>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-plataforma">
                        Plataforma
                    </label>
                    <select class="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded focus:outline-none focus:bg-white focus:border-gray-500" id="grid-plataforma">
                        <option>None</option>
                        <option>PlayStation</option>
                        <option>Xbox</option>
                        <option>Nintendo</option>
                        <option>Juegos de Mesa</option>
                    </select>
                </div>

                <div>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-description">
                        Descripción
                    </label>
                    <textarea class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 h-32 resize-none focus:outline-none focus:bg-white focus:border-gray-500" id="grid-description" placeholder=""></textarea>
                </div>

                <div>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-precio">
                        Precio
                    </label>
                    <input class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-precio" type="text" placeholder="€"></input>
                </div>
            </div>
        </form>    
            );
}