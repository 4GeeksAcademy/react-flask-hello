


import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";


export const DetailsGames = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [detailsGame, setDetailsGame] = useState([]);
    const { id } = useParams();



 const getDetailsGame = async () => {
        const responsive = await fetch(`${backendUrl}api/games/detailsgames/${id}`)
        const data = await responsive.json();
        
        
        setDetailsGame(data.game)

        

    }
    useEffect(() => {
        getDetailsGame()
    }, [])







  return (


    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          // MIRAR ESTO POR QUE DEBE SALIR LA IMAGEN DEL JUEGO QUE PASAMOS. OTRA OPCION ES AÑADIR OTRA IMAGEN PARA EL DETALLE DEL JUEGO EN EL REGISTRO DEL JUEGO
          backgroundImage: "url()",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Panel - Game Info */}
        <div className="w-1/2 p-8 flex items-center">
          <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-8 max-w-lg bg-black">
            {/* Title */}
            <h1 className="text-3xl font-bold text-white mb-4">{detailsGame.name}</h1>

            {/* Developer */}
            <p className="text-gray-300 text-sm font-medium mb-4">{detailsGame.distribuidora}</p>

            {/* Platform Tags */}
            <div className="flex gap-2 mb-6">
              <span className="bg-blue-900 text-white px-3 py-1 rounded text-xs font-medium">{detailsGame.platform}</span>
             
            </div>

          
            

            {/* Price */}
            <div className="mb-2">
              <span className="text-white text-3xl font-bold">Precio: {detailsGame.price} €</span>
              
            </div>

           
            

            {/* Buttons */}
            <div className="flex gap-3">
              <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg flex-1 transition-colors">
                Añadir al carrito
              </button>
              <button className="bg-red-900 hover:bg-red-700 text-white p-3 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Game Features */}
        <div
          className="w-1/2 p-8 flex items-center justify-end relative bg-cover bg-center"
          style={{ backgroundImage: "url('/tu-imagen.jpg')" }} // Cambia esto por la ruta de tu imagen
        >
          {/* Capa oscura para mejorar contraste */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Contenido visible por encima del fondo */}
          <div className="max-w-md space-y-6 relative z-10">
            {/* PS Plus Requirement */}
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 p-2 rounded">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Jugadores online:{detailsGame.online}</p>
               
              </div>
            </div>

            {/* Online Optional */}
            <div className="flex items-start gap-3">
              <div className="bg-gray-600 p-2 rounded">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </div>
              <p className="text-white font-medium">{detailsGame.gamemode}</p>
            </div>

            {/* Single Player */}
            <div className="flex items-start gap-3">
              <div className="bg-gray-600 p-2 rounded">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <p className="text-white font-medium"> Jugadores: {detailsGame.offline} </p>
            </div>

            {/* PS5 Version */}
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 p-2 rounded">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-2V2.5C17 2.22 16.78 2 16.5 2S16 2.22 16 2.5V4H8V2.5C8 2.22 7.78 2 7.5 2S7 2.22 7 2.5V4H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Versión para {detailsGame.platform}</p>
                <p className="text-gray-300 text-sm">Funciones de vibración y efecto gatillo obligatorias</p>
                <p className="text-gray-300 text-sm">Mejorado para details.platform Pro</p>
                <p className="text-gray-300 text-sm">
                  Compatible para jugar en streaming en {detailsGame.platform} solo con suscripción a Premium
                </p>
              </div>
            </div>

            {/* Age Rating */}
            <div className="flex items-start gap-3">
              {/* AQUI PONDREMOS LA EDAD COMO PARAMETRO DE JUEGO */}
              <div className="bg-orange-600 p-2 rounded font-bold text-white text-lg min-w-[40px] text-center">18</div>
              <div>
                {/* AQUI PONDREMOS LAS OPCIONES DEL PEGY */}
                <p className="text-white font-medium">Lenguaje fuerte, Violencia fuerte,</p>
                <p className="text-gray-300 text-sm">Compras dentro del juego, Los usuarios interactúan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}