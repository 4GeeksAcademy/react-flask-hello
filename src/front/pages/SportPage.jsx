import React from "react";
import { Navbar } from "../components/Navbar";

// index.css
import "../../styles/sport.css";

const SportPage = () => {
    return (
        <div className="sport-page container mt-5 ">
            <section className="sport-header text-center py-5">
                <h1 className="display-4">Deporte Personalizado</h1>
                <p className="lead">
                    Mejora tu salud con planes de deporte adaptados a tus objetivos.
                </p>
            </section>

            {/* Planes de deporte */}
            <section className="planes my-5">
                <h2 className="text-center subtittle mb-4 ">Nuestros Planes</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card h-100 shadow">
                            <div className="card-body sport1">
                                <h5 className="card-title mb-4">Plan Pérdida de Peso</h5>
                                <img src="/perdidaPeso.webp" className="card-img-top" alt="Plan pérdida de peso" />
                                <p className="card-text m-3">
                                    Planes bajos en calorías con todos los deportes esenciales.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 shadow">
                            <div className="card-body sport1">
                                <h5 className="card-title mb-4">Plan Ganancia Muscular</h5>
                                <img src="/masa_muscular.jpg" className="card-img-top" alt="Ganancia Muscular" />
                                <p className="card-text m-3">
                                    Planificación para el crecimiento muscular.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 shadow">
                            <div className="card-body sport1">
                                <h5 className="card-title mb-4">Plan Salud General</h5>
                                <img src="/ejercicios_balanceados.jpg" className="card-img-top" alt="Salud General" />
                                <p className="card-text m-3">
                                    Ejercicios balanceados para sentirte bien cada día.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Beneficios */}
            <section className="beneficios my-5">
                <h2 className="text-center subtittle mb-4">¿Por qué elegirnos?</h2>
                <ul className="list-group list-group-flush caja-bot">
                    <li className="list-group-item">🍏 Asesoramiento profesional</li>
                    <li className="list-group-item">🧬 Ejercicios adaptadas a tu metabolismo</li>
                    <li className="list-group-item">📊 Seguimiento de resultados</li>
                </ul>
            </section>
        </div>
    );
};
export default SportPage;