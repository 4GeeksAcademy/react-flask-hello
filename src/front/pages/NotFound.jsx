import { useNavigate } from "react-router-dom";

export const NotFound = () => {

  const navigate = useNavigate();

  const rutaVistaHome = () => {
    navigate("/vistahome");
  };
  const mostrarJuego = () => {
    const juego = document.getElementById("juego");
    if (juego) {
      juego.classList.toggle("hidden");
    }
  }

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="m-4 text-blue-600 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">404 No encontrado</h1>
      </div>
      <div className="flex justify-center">
        <p>Pero no te preocupes, no nos hemos ido de vacaciones, solo esta tardando un poco mas en cargar</p>
      </div>
      <br />
      <div className="flex justify-center">
      </div>
      <div className="text-center justify-center">
        <p className="m-3">mientras tanto, te ofrecemos una partidita al pacman </p>
        <p>si quieres jugar pulsa el boton</p>
        <button onClick={() => mostrarJuego()} >JUGAR</button>

        <div id="juego" className="flex justify-center hidden mt-4 p-4 bg-gray-100 rounded">
          <iframe src="./404_not_found/index.html" width="640" height="480" frameborder="0"></iframe>
        </div >
      </div >
    </div >

  );
}