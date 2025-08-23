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
      style={{
        backgroundImage: "url('https://wallpapercave.com/wp/wp4473868.jpg')",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
        gap: "1rem",
        textAlign: "center",
        padding: "1rem",
      }}
    >    
      
        <h1
        style={{
          color: "#d0ff00ff",
          backgroundColor: "rgba(0, 0, 0, 1)",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          maxWidth: "600px",
        }}
        >
        404 - Página no encontrada</h1>

      <p
        style={{
          color: "#d0ff00ff",
          backgroundColor: "rgba(0, 0, 0, 1)",
          borderRadius: "0.5rem",
          maxWidth: "600px",
        }}
      >
        Pero no te preocupes, no nos hemos ido de vacaciones, solo está tardando un poco más en cargar.
      </p>
      <p
        style={{
          color: "#d0ff00ff",
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          maxWidth: "600px",
        }}
      >        
      Mientras tanto, te ofrecemos una partidita al Pacman
      </p>

      {mostrarJuego && (
        <div className="mt-4 p-4 bg-gray-100 rounded-xl shadow-lg transition-all duration-300">
          <iframe
            src="./404_not_found/index.html"
            width="640"
            height="480"
            title="Pacman"
            className="rounded-lg"
          ></iframe>
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="btn btn-chip ml-[1px]"
      >
        Volver al inicio
      </button>

    </div>
  );
};
