import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Hero() {
    return (
        <div id="carouselExampleIndicators" className="carousel carousel-dark slide">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>

            <div className="carousel-inner">
                {/* Slide 1 */}
                <div className="carousel-item active">
                    <section className="hero-section d-flex flex-column justify-content-center align-items-center text-center py-5 px-3">
                        <div className="hero-content container">
                            <img src="src/front/assets/img/MM-2.png" alt="Hero Illustration" className="logo-image mb-4" />
                            <h1 className="fw-bold mb-3">
                                Encuentra el mentor perfecto para alcanzar <span className="span-text">tus objetivos</span>
                            </h1>
                            <p className="hero-text mb-4">
                                Agenda sesiones 1:1, recibe orientación personalizada y alcanza tus metas más rápido.
                            </p>
                            <Link to="/search-mentor">
                                <button className="btn btn-primary cta-button px-4 py-2">Encuentra un mentor</button>
                            </Link>
                        </div>
                    </section>
                </div>

                {/* Slide 2 */}
                <div className="carousel-item">
                    <section className="hero-section d-flex flex-column justify-content-center align-items-center text-center py-5 px-3">
                        <div className="hero-content container">
                            <img src="src/front/assets/img/MM-2.png" alt="Hero Illustration" className="logo-image mb-4" />
                            <h1 className="fw-bold mb-3">
                                Comparte tu experiencia. Inspira el <span className="span-text">crecimiento</span> de otros
                            </h1>
                            <p className="hero-text mb-4">
                                Conviértete en mentor y ayuda a nuevos profesionales a alcanzar su potencial.
                            </p>
                            <Link to="/register">
                            <button className="btn btn-primary cta-button px-4 py-2">Quiero ser mentor</button>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>

            {/* Controles del carrusel */}
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}
