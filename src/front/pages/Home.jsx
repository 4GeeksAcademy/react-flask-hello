import React from "react";
import homeFoto from "../assets/img/homeFoto.jpg";



const Home = () => {
  return (
    <div className="homepage-container d-flex align-items-center justify-content-center">
      <div className="container-fluid">
        <div className="row homepage-content shadow-lg rounded-4 overflow-hidden">

          <div className="col-md-6 p-5 d-flex flex-column justify-content-center text-center text-md-start homepage-text">
            <h1 className="display-4 fw-bold mb-3">Organiza tus eventos como nunca antes</h1>
            <p className="lead mb-4">Gestiona asados, fiestas y reuniones familiares.</p>
            <p className="lead mb-4">Invita, asigna tareas y mantén todo bajo control.</p>
            <div className="homepage-buttons d-flex flex-column flex-md-row gap-3 justify-content-center justify-content-md-start">
              <button className="btn btn-primary px-4 py-2">Registrarse</button>
              <button className="btn btn-outline-primary px-4 py-2">Iniciar Sesión</button>
            </div>
          </div>

          <div className="col-md-6 d-none d-md-block p-0">
            <img
              src={homeFoto}
              alt="Organización de eventos"
              className="img-fluid w-100 h-100 object-fit-cover homepage-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;