import { useNavigate } from "react-router-dom";
import { VistaHome } from "../components/VistaHome";

export const Formulario = () => {

  const navigate = useNavigate();

  const rutaVistaHome = () => {
    navigate("/vistahome");
  };

  return (
    <button className="text-black bg-yellow-700" onClick={rutaVistaHome}>Home</button>
  );
};