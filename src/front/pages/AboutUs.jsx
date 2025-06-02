import React from "react";
import ReactPlayer from 'react-player'
import { Navbar } from "../components/Navbar";
import "../../styles/aboutus.css";

const AboutUs = () => {
    const selectedTrainer = {
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        name: "Pepe",
        datos: "Estoy especializado en Crossfit.",
        titulos: "Ciencias del deporte",
        selected: true,
    };

    return (
        <>
            <Navbar />
            <header>
                <div className="row">
                    <div className="col-md-12">
                        <div className="video-wrapper">
                            <ReactPlayer
                                url="https://www.youtube.com/watch?v=4-zjQvTDnbw"
                                playing={true}
                                muted={true}
                                loop={true}
                                controls={false}
                                width="100%"
                                height="1200px"
                                style={{ objectFit: 'cover' }}
                                config={{
                                    youtube: {
                                        playerVars: {
                                            modestbranding: 1,
                                            showinfo: 0,
                                            rel: 0
                                        }
                                    }
                                }}
                            />
                            <div className="video-overlay"></div>
                        </div>
                        <div className="about-overlay-text">
                            <h1>Nuestra misión</h1>
                            <p>Transformamos vidas a través del deporte y la nutrición personalizada.</p>
                        </div>

                    </div>
                </div>
                <section className="about-description">
                    <div className="container text-center py-5">
                        <h2 className="mb-4">Más que un equipo, somos un movimiento</h2>
                        <p className="lead">
                            Aquí no solo entrenamos músculos, entrenamos la mente.
                            No se trata solo de levantar peso, sino de soltar cargas.
                            No buscamos cuerpos perfectos, buscamos personas reales que sueñan con ser su mejor versión.
                            Cada gota de sudor cuenta una historia, cada paso adelante rompe una barrera.
                            En este lugar, cada meta se alcanza acompañado, nunca solo.
                            Porque creemos en el poder de la constancia, del apoyo, y de esa chispa interior que nos hace imparables.
                        </p>
                    </div>
                </section>
                <section className="about-us-section container py-5">
                    <a href="https://ubiquitous-disco-r4pjvwprwv4rhwjjj-3000.app.github.dev/entrenadores" rel="noopener noreferrer" className="valores-link">
                        <h2 className="text-center mb-4">Nuestro Equipo</h2></a>
                    <div className="row">
                        {[1, 2, 3].map((n) => (
                            <div className="col-md-4 text-center mb-4" key={n}>
                                <img
                                    src={`https://randomuser.me/api/portraits/men/7${n}.jpg`}
                                    alt="Entrenador"
                                    className="rounded-circle mb-3"
                                    width="150"
                                    height="150"
                                />
                                <h4>Entrenador {n}</h4>
                                <p>Especialista en rendimiento, salud y motivación.</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="valores container py-5">
                    <a href="https://ubiquitous-disco-r4pjvwprwv4rhwjjj-3000.app.github.dev/entrenadores" rel="noopener noreferrer" className="valores-link">
                        <h2 className="text-center mb-4">Nuestros Valores</h2></a>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <i className="fas fa-dumbbell fa-2x mb-2"></i>
                            <h5>Disciplina</h5>
                            <p>El motor del progreso constante.</p>
                        </div>
                        <div className="col-md-4">
                            <i className="fas fa-heartbeat fa-2x mb-2"></i>
                            <h5>Salud</h5>
                            <p>Cuidamos tu cuerpo desde dentro.</p>
                        </div>
                        <div className="col-md-4">
                            <i className="fas fa-users fa-2x mb-2"></i>
                            <h5>Comunidad</h5>
                            <p>Crecemos juntos, motivándonos cada día.</p>
                        </div>
                    </div>
                </section>
                <section className="cta text-white text-center py-5">
                    <h2>¿Estás listo para el cambio?</h2>
                    <p>Únete a nuestro equipo y comienza tu transformación hoy.</p>
                    <button className="btn btn-primary">Comenzar ahora</button>
                </section>
            </header>
        </>
    );
};

export default AboutUs;
