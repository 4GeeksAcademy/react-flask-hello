import React from "react";

import CardPlan from "../components/CardPlan";

// index.css
import "../../styles/nutricion.css";



const NutricionPage = () => {

  const planes = [
    { tittle: "Pérdida de Peso", img: "/perdidaPeso.webp", parrafo: "Planes nutricionales hipocalóricos con control de macronutrientes, priorizando saciedad, densidad nutricional y mantenimiento de masa magra." },
    { tittle: "Ganancia Muscular", img: "/gananciaMuscular.jpg", parrafo: "Protocolos hipercalóricos con alto contenido proteico, tiempos de comida estratégicos y enfoque en anabolismo muscular sostenido." },
    { tittle: "Salud General", img: "/saludGeneral.jpg", parrafo: "Dieta normocalórica con adecuada distribución de macro y micronutrientes, enfocada en salud digestiva, inmunológica y energética." }
  ]
 
  return (
    <div className="nutricion-page container mt-5">
      <section className="npHero text-center py-5">
        <h1 className="display-4 tittle">Nutrición Personalizada</h1>
        <p className="lead">
          Mejora tu salud con planes de alimentación adaptados a tus objetivos.
        </p>
      </section>

      <section className="planes my-5">
        <h2 className="text-center subtittle mb-4">Nuestros Planes</h2>
        <div className="row">
          {planes.map((p) => {
            return (
              <div className="col-md-4">
                <CardPlan tittle={p.tittle} img={p.img} parrafo={p.parrafo}></CardPlan>
              </div>
            )
          })}
        </div>
      </section>

      <section className="beneficios my-5">
        <h2 className="text-center subtittle mb-4">¿Por qué elegirnos?</h2>
          <ul className="list-group list-group-flush caja-bot">
            <li className="list-group-item">Asesoramiento profesional</li>
            <li className="list-group-item">Ejercicios adaptadas a tu metabolismo</li>
            <li className="list-group-item">Seguimiento de resultados</li>
          </ul>
      </section>

    </div>
  );
};

export default NutricionPage;