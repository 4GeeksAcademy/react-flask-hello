import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../styles/carrusel.css";

const trainers = [
  {
    id: 1,
    src: "https://hips.hearstapps.com/hmg-prod/images/arnold-schwarzenegger-1547023769.jpg",
    name: "Carlos Mendoza",
    specialty: "Entrenador Personal",
    description:
      "Especialista en fuerza y acondicionamiento físico. 8 años de experiencia ayudando a alcanzar objetivos de fitness.",
  },
  {
    id: 2,
    src: "https://www.avanzaentucarrera.com/orientacion/comp/uploads/2014/05/pilates-1024x543.jpg",
    name: "Ana Rodríguez",
    specialty: "Yoga & Pilates",
    description:
      "Instructora certificada en yoga y pilates. Enfoque en bienestar integral y flexibilidad.",
  },
  {
    id: 3,
    src: "https://www.sinburpeesenmiwod.com/wp-content/uploads/2018/01/cursos-oficiales-entrenador-crossfit.jpg",
    name: "Miguel Torres",
    specialty: "CrossFit",
    description:
      "Coach de CrossFit nivel 2. Especialista en entrenamientos funcionales de alta intensidad.",
  },
  {
    id: 4,
    src: "https://estheticinternacional.es/wp-content/uploads/2020/07/elegir-mejor-dietista-nutricionista-deportivo-3.jpg",
    name: "Laura García",
    specialty: "Nutrición Deportiva",
    description:
      "Nutricionista deportiva y entrenadora. Planes personalizados para optimizar rendimiento y salud.",
  },
  {
    id: 5,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-qWF0RyCiCXz6hmsON3sqQKhMS1LwwFR4g&s",
    name: "David López",
    specialty: "Nutrición",
    description:
      "Nutricionista especializado en pérdida de grasa y ganancia muscular.",
  },
];

const BootstrapCarousel = () => {
  return (
    <div className="container mt-5">
      <div
        id="trainerCarousel"
        className="carousel slide yellow-border"
        data-bs-ride="carousel"
      >
        {/* Indicadores */}
        <div className="carousel-indicators">
          {trainers.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#trainerCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner rounded shadow">
          {trainers.map((trainer, index) => (
            <div
              key={trainer.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={trainer.src}
                className="d-block w-100 object-fit-cover"
                alt={trainer.name}
                style={{ height: "550px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block p-3 rounded">
                <h5>{trainer.name}</h5>
                <h6 className="text-info">{trainer.specialty}</h6>
                <p className="text-light">{trainer.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controles */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#trainerCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#trainerCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
  );
};

export default BootstrapCarousel;







