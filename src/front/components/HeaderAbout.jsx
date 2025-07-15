import { Link } from "react-router-dom";
import HomeAbout from "../assets/img/HomeAbout.jpg"
import { useTranslation } from "react-i18next";

export const HeaderAbout = () => {
    const { t } = useTranslation();

    return (
        
        <section className="position-relative w-100 h-100 d-flex align-items-center my-5 pt-5 py-5">
                    <img src={HomeAbout} alt="CloudTech background image" className="z-n1 top-0 start-0 mx-auto position-absolute w-100 h-100 object-fit-cover"/>
                    <div className="position-absolute w-100 h-100 top-0 start-0 bg-dark bg-opacity-50 mx-auto z-n1"></div>
                    <div className="container w-100 h-100">
                        <div className="row z-0">
                            <div className="col-12 col-lg-6 offset-lg-6 my-5 pt-5 d-flex flex-column justify-content-center align-items-center z-1 text-lg-end">
                                <h1 className="hero-title-home display-3 fw-bolder text-warning mt-sm-0 mt-5 mb-4">
                                    Lorem, ipsum<br />dolor sit amet.
                                </h1>
        
                                <p className="hero-subtitle-home fs-5 text-white w-75 mb-5">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet dolorum iste enim consequatur corporis ipsa tenetur modi sunt ullam placeat.
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