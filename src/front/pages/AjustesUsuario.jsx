import { useNavigate } from "react-router-dom";
import { VistaHome } from "./VistaHome";
import { div } from "framer-motion/client";

export const AjustesUsuario = () => {

  const navigate = useNavigate();

  const rutaVistaHome = () => {
    navigate("/vistahome");
  };

  return (
    <div>
      <h1>Pagina de Ajustes de usario</h1>
    <button className="text-black bg-yellow-700" onClick={rutaVistaHome}>Home</button>
    </div>
  );
};