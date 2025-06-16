import React from "react";
import { Navbar } from "../components/Navbar";
import CardPlan from "../components/CardPlan";

// index.css
import "../../styles/sportProfesional.css";

const SportProfesional = () => {

    const planes = [
        { tittle: "Pérdida de Peso", img: "/perdidaPeso2.jpg", parrafo: "Programas hipocalóricos estructurados con enfoque en entrenamiento cardiovascular, funcional y de resistencia, orientados a la quema de grasa y mejora del metabolismo basal." },
        { tittle: "Ganancia Muscular", img: "/masaMuscular.jpg", parrafo: "Rutinas progresivas de sobrecarga con distribución óptima de macronutrientes, enfocadas en la hipertrofia muscular y mejora de la fuerza máxima." },
        { tittle: "Salud General", img: "/ejercicios_balanceados.jpg", parrafo: "Entrenamientos equilibrados que combinan movilidad, fuerza básica y resistencia aeróbica para mejorar la salud metabólica, la postura y la energía diaria." }
    ]

    return (
        <div className="sport-profesional container mt-5 ">
            <section className="sport-header text-center py-5">
                <h1 className="display-4">Deporte Personalizado</h1>
                <p className="lead">
                    Mejora tu salud con planes de deporte adaptados a tus objetivos.
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


        </div>
    );
};
export default SportProfesional;