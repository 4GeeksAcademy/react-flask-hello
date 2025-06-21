import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/Entrenadorinfo.css";

const EntrenadorInfo = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/professionals/${id}`);
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
        <div className="info-header">
          <img
            src={trainer.imagen || "https://i.pravatar.cc/300"}
            alt={`${trainer.nombre}`}
            className="info-foto"
          />
          <div>
            <h2>{trainer.nombre} {trainer.apellido}</h2>
            <p><strong>Especialidad:</strong> {trainer.profession_type || "No especificada"}</p>
            <p><strong>Email:</strong> {trainer.email}</p>
          </div>
        </div>

        <div className="info-detalle">
          <h3>Descripción</h3>
          <p>{trainer.descripcion || "No se ha proporcionado una descripción."}</p>

          <h3>Experiencia</h3>
          <p>{trainer.experiencia || "No especificada."}</p>

          {trainer.especialidades && (
            <>
              <h3>Áreas de entrenamiento</h3>
              <ul className="especialidades-lista">
                {trainer.especialidades.map((area, i) => (
                  <li key={i}>{area}</li>
                ))}
              </ul>
            </>
          )}
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
