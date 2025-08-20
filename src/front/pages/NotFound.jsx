import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  const rutaVistaHome = () => {
    navigate("/");
  };

  const mostrarJuego = () => {
    const juego = document.getElementById("juego");
    if (juego) {
      juego.classList.toggle("d-none");
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-white text-center px-3"
      style={{ gap: '1rem' }}
    >
      <h1 className="display-4 fw-bold text-primary">
        404 No encontrado
      </h1>

      <p>
        Pero no te preocupes, no nos hemos ido de vacaciones, solo está tardando un poco más en cargar.
      </p>
      <p>
        Mientras tanto, te ofrecemos una partidita al pacman
      </p>

      <div
        id="juego"
        className="d-flex justify-content-center d-none mt-3 p-3 bg-light rounded"
      >
        <iframe
          src="./404_not_found/index.html"
          width="640"
          height="480"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};
