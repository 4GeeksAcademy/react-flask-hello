import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaHandshake } from "react-icons/fa";


const HowItWorks = () => {
  return (
    <div className="howitwork  container mt-5 mb-5">
      <div className="row">
        <h1 className="text-center mb-5">¿Cómo funciona?</h1>
        <div className=" container row d-flex justify-content-around">
          <div className="text-center col-sm-12 col-md-6 col-lg-4">
            <FaUserGraduate className="icons mb-3" size={140} />
            <h4>Crea tu perfil</h4>
            <p className="hero-text m-2">Regístrate como estudiante o mentor en pocos pasos.</p>
          </div>
          <div className="text-center col-sm-12 col-md-6 col-lg-4">
            <FaChalkboardTeacher className="icons mb-3" size={150} />
            <h4>Conecta</h4>
            <p className="hero-text m-2">Encuentra mentores o alumnos según tus intereses y habilidades.</p>
          </div>
          <div className="text-center col-sm-12 col-md-6 col-lg-4">
            <FaHandshake className="icons mb-3" size={150} />
            <h4>Aprende y enseña</h4>
            <p className="hero-text m-2">Agenda sesiones de mentoría y alcanza tus metas profesionales.</p>
          </div>
        </div>
      </div>
    </div>

  )

};

export default HowItWorks