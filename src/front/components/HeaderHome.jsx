import React from "react";
import { Link } from "react-router-dom";
import HomeOne from "../assets/img/HomeOne.jpg"

export const HeaderHome = () => {

    return (

        
        <section className="w-100 h-100 position-relative">
            <div className="position-absolute w-100 h-100 bg-dark bg-opacity-50 mx-auto"></div>
            <img src={HomeOne} alt="CloudTech background image" className="z-n1 mx-auto position-absolute w-100 h-100 object-fit-cover d-sm-block"/>
            <div className="container w-100 h-100">
                <div className="row text-center z-0">
                    <div className="col my-5 pt-5 d-flex flex-column justify-content-center align-items-center z-1">
                        <h1 className="hero-title-home display-3 fw-bolder text-warning mt-sm-0 mt-5 mb-4">
                            Moldeamos ideas <br />para crear universos digitales.
                        </h1>

                        <p className="hero-subtitle-home fs-5 text-white w-75 mb-5">
                            Construimos entornos digitales que fortalecen tu marca y unen tus audiencias. Creamos presencias online que aseguran resultados medibles y un crecimiento escalable.
                        </p>

                        <div className="d-flex flex-column justify-content-center flex-md-row gap-3 w-100">
                            <Link to="/projects" className="btn btn-outline-light btn-lg rounded-pill px-5">Proyectos</Link>
                            <Link to="/contact" className="btn btn-outline-yellow btn-lg rounded-pill px-5">Contáctanos</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}