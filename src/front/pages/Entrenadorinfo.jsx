import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/Entrenadorinfo.css";

const EntrenadorInfo = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("📦 ID recibido:", id);
    const fetchTrainer = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/professionals/${id}`;
        console.log("🔗 URL usada:", url);

        const resp = await fetch(url);
        const contentType = resp.headers.get("content-type");
        console.log("📥 Content-Type:", contentType);

        const data = await resp.json();
        setTrainer(data);
      } catch (error) {
        console.error("Error cargando entrenador:", error);
      }
    };

    fetchTrainer();
  }, [id]);

  if (!trainer) return <p className="cargando">Cargando información del entrenador...</p>;

  return (
    <div className="entrenador-info-container">
      <div className="entrenador-info-card">
        <h2 className="info-header-nombre">{trainer.nombre} {trainer.apellido}</h2>

        <div className="info-grid">
          <div className="info-columna">
            <p><span className="info-titulo">Email:</span> {trainer.email}</p>
            <p><span className="info-titulo">Teléfono:</span> {trainer.telefono || "No especificado"}</p>
            <p><span className="info-titulo">Sexo:</span> {trainer.sexo || "No especificado"}</p>
          </div>

          <div className="info-columna" style={{ textAlign: "center" }}>
            <img
              src={trainer.imagen || "https://i.pravatar.cc/300"}
              alt={trainer.nombre}
              className="info-foto"
            />
          </div>

          <div className="info-columna">
            <p><span className="info-titulo">Descripción:</span><br />{trainer.descripcion || "No especificada"}</p>
            <p><span className="info-titulo">Experiencia:</span> {trainer.experiencia ? `${trainer.experiencia} años` : "No especificada"}</p>
          </div>
        </div>

        <div className="info-volver">
          <button onClick={() => navigate(-1)} className="btn-volver">
            ← Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntrenadorInfo;
