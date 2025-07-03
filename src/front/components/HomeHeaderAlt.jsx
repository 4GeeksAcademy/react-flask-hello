import backHomeHeader from "../assets/img/HomeOne.jpg"
import { Link } from "react-router-dom"

export const HomeHeaderAlt = () => {
    return (
        <section className="w-100 h-100 mb-5 position-relative">
            <img src={backHomeHeader} alt="CloudTech services background image" className="z-n1 mx-auto position-absolute mt-5 w-100 h-100 object-fit-cover d-sm-block" />
            <div className="container w-100 h-100 ">
                <div className="row  text-center">
                    <div className="col my-5 pt-5 d-flex flex-column justify-content-center align-items-center">
                        <h1 className="hero-title-home display-3 fw-bolder text-warning mt-sm-0 mt-5 mb-4">
                            Moldeamos ideas<br />para crear universos digitales.
                        </h1>

                        <p className="hero-subtitle-home fs-5 text-white w-75 mb-5">
                            Construimos entornos digitales que fortalecen tu marca y unen tus audiencias. Creamos presencias online que aseguran resultados medibles y un crecimiento escalable.
                        </p>

                        <div className="d-flex flex-column justify-content-center flex-md-row gap-3 w-100">
                            <Link to="/proyectos" className="btn btn-outline-light btn-lg rounded-pill px-5">Proyectos</Link>
                            <Link to="/contacto" className="btn btn-outline-yellow btn-lg rounded-pill px-5">Contáctanos</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}