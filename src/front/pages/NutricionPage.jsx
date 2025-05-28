import React from "react";
import { Navbar } from "../components/Navbar";
import CardPlan from "../components/CardPlan";

// index.css
import "../../styles/nutricion.css";



const NutricionPage = () => {

const planes = [
  {tittle: "Plan de Pérdida de Peso", img: "/perdidaPeso.webp", parrafo: "Menús bajos en calorías con todos los nutrientes esenciales."},
  {tittle: "Plan Ganancia Muscular", img: "/gananciaMuscular.jpg", parrafo: "Alta ingesta proteica y planificación para el crecimiento muscular."},
  {tittle: "Plan Salud General", img: "/saludGeneral.jpg", parrafo: "Nutrición balanceada para sentirte bien cada día."}
] 

  return (
    <div className="nutricion-page container mt-5">
      {/* Hero */}
      <section className="npHero text-center py-5">
        <h1 className="display-4 tittle">Nutrición Personalizada</h1>
        <p className="lead">
          Mejora tu salud con planes de alimentación adaptados a tus objetivos.
        </p>
      </section>

      <section className="planes my-5">
        <h2 className="text-center subtittle mb-4">Nuestros Planes</h2>
        <div className="row">
          {planes.map ((p)=>{
            return (
              <div className="col-md-4">
                <CardPlan tittle={p.tittle} img={p.img} parrafo={p.parrafo}></CardPlan>
              </div>
            )
          })}

        </div>

      </section>

      {/* Beneficios */}
      <section className="beneficios my-5">
        <h2 className="text-center subtittle mb-4">¿Por qué elegirnos?</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">🍏 Asesoramiento profesional</li>
          <li className="list-group-item">🧬 Dietas adaptadas a tu metabolismo</li>
          <li className="list-group-item">📊 Seguimiento de resultados</li>
        </ul>
      </section>
    </div>
  );
};

export default NutricionPage;