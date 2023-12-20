import React from "react";
import { ProfesionCard } from "./ProfesionCard";
import "../../styles/landing2.css";

export const Landing = () => {
  const profesiones = [
    {
      nombre: "Gasfiter",
      calificacion: 4.5,
      comentarios: ["Excelente trabajo!", "Lo recomiendo."],
    },
    {
      nombre: "Electricista",
      calificacion: 4.8,
      comentarios: ["excelente persona.", "Siempre cumple."],
    },
    {
      nombre: "Pintor",
      calificacion: 4.9,
      comentarios: ["excelente", "Siempre puntual."],
    },
  ];

  return (
    <div className="container2">
      <h1>Nosotros</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>

        {/* Anexa las tarjetas de profesiones */}
        <div className="row">
          {profesiones.map((profesion, index) => (
            <div className="col-md-4" key={index}>
              <ProfesionCard
                nombre={profesion.nombre}
                calificacion={profesion.calificacion}
                comentarios={profesion.comentarios}
              />
            </div>
          ))}
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title"></h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Anexa las tarjetas de profesiones */}
      <div className="row">
        {profesiones.map((profesion, index) => (
          <div className="col-md-4" key={index}>
            <ProfesionCard
              nombre={profesion.nombre}
              calificacion={profesion.calificacion}
              comentarios={profesion.comentarios}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
