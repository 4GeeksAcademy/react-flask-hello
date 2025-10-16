import { motion } from "framer-motion";

export function Hero() {
    return (

        <div id="carouselExampleIndicators" className="carousel carousel-dark slide ">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>

            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <section className="hero-section">
                        <div className="hero-content">
                            <img src="src/front/assets/img/MM-2.png" alt="Hero Illustration" className="hero-image"></img>
                            <h1>Encuentra el mentor perfecto para alcanzar <span className="span-text">tus objetivos</span> </h1>
                            <p className="hero-text">Agenda sesiones 1:1, recibe orientación personalizada y alcanza tus metas más rápido.</p>
                            <button className="cta-button">Encuentra un mentor</button>
                        </div>
                    </section>
                </div>
                <div className="carousel-item">
                    <section className="hero-section">
                        <div className="hero-content">
                            <img src="src/front/assets/img/MM-2.png" alt="Hero Illustration" className="hero-image"></img>
                            <h1>Comparte tu experiencia. Inspira el <span className="span-text">crecimiento</span> de otros</h1>
                            <p className="hero-text">Conviértete en mentor y ayuda a nuevos profesionales a alcanzar su potencial.</p>
                            <button className="cta-button">Quiero ser mentor</button>
                        </div>
                    </section>
                </div>

            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>






    )

}
