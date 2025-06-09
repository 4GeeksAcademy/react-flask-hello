import React from "react";
import "../../styles/Epersonalizado.css";

const focuses = [
  {
    title: "Pérdida de Grasa",
    description:
      "Con este enfoque lograrás reducir tu porcentaje de grasa corporal mediante un plan de entrenamiento cardiovascular, rutinas de alta intensidad y una nutrición enfocada en el déficit calórico.",
    image:
      "https://images.unsplash.com/photo-1594737625785-cb69f4c67c5c",
  },
  {
    title: "Ganancia Muscular",
    description:
      "Aquí nos enfocamos en el aumento de masa muscular mediante entrenamiento de fuerza, progresión de cargas y una dieta rica en proteínas y calorías suficientes.",
    image:
      "https://images.unsplash.com/photo-1583454110558-21f0f0bfb1a5",
  },
  {
    title: "Resistencia y Energía",
    description:
      "Mejora tu capacidad cardiovascular, respiratoria y tu energía general con entrenamientos funcionales, circuitos de resistencia y actividades aeróbicas intensas.",
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
  },
  {
    title: "Bienestar y Salud Mental",
    description:
      "Un enfoque integral que mezcla movimiento, meditación y ejercicios de bajo impacto para mejorar el equilibrio emocional, reducir el estrés y mejorar tu salud en general.",
    image:
      "https://images.unsplash.com/photo-1605296867470-66f25b3d9b37",
  },
];

export default function Epersonalizado() {
  return (
    <div className="epersonalizado-focuses">
      {focuses.map((focus, index) => (
        <div key={index} className="epersonalizado-card">
          <div className="epersonalizado-card-image">
            <img src={focus.image} alt={focus.title} />
          </div>
          <div className="epersonalizado-card-text">
            <h2 className="epersonalizado-title">{focus.title}</h2>
            <p className="epersonalizado-description">{focus.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
