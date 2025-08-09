import { useNavigate } from "react-router-dom";

export const Evento = () => {

  const navigate = useNavigate();

  const rutaVistaHome = () => {
    navigate("/vistahome");
  };

  return (
    <button className="text-black bg-yellow-700" onClick={rutaVistaHome}>Home</button>
  );
};