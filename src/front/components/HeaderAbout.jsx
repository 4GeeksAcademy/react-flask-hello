import React from "react";
import { Link } from "react-router-dom";
import HomeAbout from "../assets/img/HomeAbout.jpg"

export const HeaderAbout = () => {

    const headerStyle = {
        backgroundImage: `url(${HomeAbout})`
    };

    return (

        <header className="hero-header-home position-relative" style={headerStyle}>
            <div className="hero-overlay-home d-flex justify-content-center align-items-center">
                <div className="container">
                    <div className="d-flex flex-column align-items-center text-center">
                        <h1 className="hero-title-home display-3 fw-bolder text-warning mb-4">
                            Lorem, ipsum.<br />Lorem ipsum dolor sit amet.
                        </h1>

                        <p className="hero-subtitle-home fs-5 text-white w-75 mb-5">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet dolorum iste enim consequatur corporis ipsa tenetur modi sunt ullam placeat.
                        </p>

                        <div className="d-flex flex-column justify-content-center flex-md-row gap-3 w-75">
                            <Link to="/projects" className="btn btn-outline-light btn-lg rounded-pill px-4">Proyectos</Link>
                            <Link to="/contact" className="btn btn-outline-yellow btn-lg rounded-pill px-4">Contáctanos</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}