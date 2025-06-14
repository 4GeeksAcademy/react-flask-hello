import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/tarifas.css";

const Tarifas = () => {

  const { tipo } = useParams();
  const [eleccionSeleccionada, setEleccionSeleccionada] = useState(null);

  const opciones = [
    {
      id: "basic",
      nombre: "Tarifa Basic",
      descripcion:
        "Ideal para quienes quieren empezar a moverse. Incluye planes básicos de entrenamiento.",
      imagenes: [
        "https://img.freepik.com/foto-gratis/peso-saludable-cuidado-masculino-atletico_1139-695.jpg"
      ]
    },
    {
      id: "premium",
      nombre: "Tarifa Premium",
      descripcion:
        "Incluye entrenamiento y nutrición personalizados.",
      imagenes: [
        "https://img.freepik.com/foto-gratis/mujer-joven-cinta-metrica-cocina_1303-24778.jpg",
        "https://img.freepik.com/foto-gratis/pareja-gimnasio_1303-5541.jpg"
      ]
    },
    {
      id: "dmpc",
      nombre: "Tarifa DMPC",
      descripcion:
        "Acceso completo a todos los servicios y asesoramientos.",
      imagenes: [
        "https://img.freepik.com/foto-gratis/mujeres-comida-saludable-tiro-medio_23-2149894948.jpg"
      ]
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (tipo) {
      const plan = opciones.find(op => op.id === tipo.toLowerCase());
      if (plan) setEleccionSeleccionada(plan);
    }
  }, [tipo]);

  return (
    <div className="tarifas-container">
      <h1 className="titulo-tarifas">Tarifas</h1>

      <div className="grid-opciones">
        {opciones.map((plan, i) => (
          <div
            key={i}
            className={`opciones-item ${eleccionSeleccionada?.id === plan.id ? "activo" : ""}`}
            onClick={() => setEleccionSeleccionada(plan)}
          >
            {plan.nombre}
          </div>
        ))}
      </div>

      {eleccionSeleccionada && (
        <div className="detalle-opciones">
          <h2>{eleccionSeleccionada.nombre}</h2>
          <div className="imagenes-grid">
            {eleccionSeleccionada.imagenes.map((img, i) => (
              <img key={i} src={img} alt={`Imagen ${i + 1}`} />
            ))}
          </div>
          <p>{eleccionSeleccionada.descripcion}</p>
        </div>
      )}
    </div>
  );
};

export default Tarifas;
