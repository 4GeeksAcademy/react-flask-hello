import React from "react";
import { Link } from "react-router-dom";
import HomeOne from "../assets/img/HomeOne.jpg"

export const HeaderHome = () => {

    const headerStyle = {
        backgroundImage: `url(${HomeOne})`
    };

    return (

        <header className="hero-header-home position-relative mt-5" style={headerStyle}>
            <div className="hero-overlay-home d-flex justify-content-center align-items-center">
                <div className="container">
                    <div className="d-flex flex-column align-items-center text-center">
                        <h1 className="hero-title-home display-3 fw-bolder text-warning mb-4">
                            Moldeamos ideas<br />para crear universos digitales.
                        </h1>

                        <p className="hero-subtitle-home fs-5 text-white w-75 mb-5">
                            Construimos entornos digitales que fortalecen tu marca y unen tus audiencias. Creamos presencias online que aseguran resultados medibles y un crecimiento escalable.
                        </p>

                        <div className="d-flex flex-column justify-content-center flex-md-row gap-3 w-75">
                            <Link to="/proyectos" className="btn btn-outline-light btn-lg rounded-pill px-4">Proyectos</Link>
                            <Link to="/contacto" className="btn btn-outline-yellow btn-lg rounded-pill px-4">Contáctanos</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}