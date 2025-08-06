import { useNavigate } from "react-router-dom";
import { VistaHome } from "./VistaHome";

export const AjustesUsuario = () => {

  const navigate = useNavigate();

  const rutaVistaHome = () => {
    navigate("/vistahome");
  };

  return (
    <button className="text-black bg-yellow-700" onClick={rutaVistaHome}>Home</button>
  );
};