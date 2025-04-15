import { useParams } from "react-router-dom";

export const MissionDetail = () => {
  const { id } = useParams();
  return (
    <div className="container">
      <h2>Detalles de misión #{id}</h2>
      <p>Mostrar información detallada de una misión específica</p>
    </div>
  );
};