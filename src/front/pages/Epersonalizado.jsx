import React from "react";
import "../../styles/Epersonalizado.css";

const focuses = [
  {
    title: "Pérdida de Grasa",
    description:
      "Con este enfoque lograrás reducir tu porcentaje de grasa corporal mediante un plan de entrenamiento cardiovascular, rutinas de alta intensidad y una nutrición enfocada en el déficit calórico.",
    image:
      "https://as01.epimg.net/deporteyvida/imagenes/2018/02/10/portada/1518260701_362751_1518260789_noticia_normal.jpg",
  },
  {
    title: "Ganancia Muscular",
    description:
      "Aquí nos enfocamos en el aumento de masa muscular mediante entrenamiento de fuerza, progresión de cargas y una dieta rica en proteínas y calorías suficientes.",
    image:
      "https://www.labolsadelcorredor.com/wp-content/uploads/2021/11/crecimiento-masa-muscular-1.jpg",
  },
  {
    title: "Resistencia y Energía",
    description:
      "Mejora tu capacidad cardiovascular, respiratoria y tu energía general con entrenamientos funcionales, circuitos de resistencia y actividades aeróbicas intensas.",
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
  },
  {
    title: "Nutrición y su Importancia",
    description:
      "La base de todo progreso físico y bienestar radica en una alimentación equilibrada. Este enfoque te ayudará a comprender cómo una buena nutrición potencia tu rendimiento, acelera tu recuperación y mejora tu salud general.",
    image:
      "https://media.istockphoto.com/id/1457433817/es/foto/grupo-de-alimentos-saludables-para-la-dieta-flexitariana.jpg?s=612x612&w=0&k=20&c=2w5l2DEJWFGxSnmJxX_RCE40RriE7WtSoKKpuxw5luE=",
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
