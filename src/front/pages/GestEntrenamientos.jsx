import React from "react";
import "../../styles/GestEntrenamientos.css";
import Ejercicios from "../components/Ejercicios";


const GestEntrenamientos = () => {
  return (
    <>
    <div className="GestEntrenamientos-container">
      <h1>Gestionar Entrenamientos</h1>
      <div className="grid-container">
        <div className="column">
          <h3>Estado actual (físico)</h3>
          <p>Peso: 80kg</p>
          <p>Musculación: Media</p>
          <p>Resistencia: Baja</p>
        </div>
        <div className="column">
          <h3>Diferencia (1 ↔ 3)</h3>
          <p>Peso a perder: 5kg</p>
          <p>Musculación por mejorar</p>
        </div>
        <div className="column">
          <h3>Estado actual </h3>
          <p>Motivación: Media</p>
          <p>Hábitos: Irregulares</p>
        </div>
        <div className="column">
          <h3>Diferencia (3 ↔ 5)</h3>
          <p>Incrementar motivación</p>
          <p>Establecer rutina</p>
        </div>
        <div className="column">
          <h3>Objetivo final</h3>
          <p>Peso: 75kg</p>
          <p>Musculación: Alta</p>
          <p>Hábitos saludables y estables</p>
        </div>
      </div>

    </div>
      <Ejercicios/>
      </>
  );
};

export default GestEntrenamientos;
