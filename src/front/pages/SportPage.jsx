import React from "react";

const SportPage = () => {
    return (
        <div className= "fondo">
        <div className="sport-page container mt-5 ">
            {/* Hero */}
            <section className="hero text-center py-5">
                <h1 className="display-4">Deporte Personalizado</h1>
                <p className="lead">
                    Mejora tu salud con planes de deporte adaptados a tus objetivos.
                </p>
            </section>

            {/* Planes de deporte */}
            <section className="planes my-5">
                <h2 className="text-center mb-4">Nuestros Planes</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card h-100 shadow">
                            <div className="card-body sport1">
                                <h5 className="card-title">Plan Pérdida de Peso</h5>
                                <p className="card-text">
                                    Planes bajos en calorías con todos los deportes esenciales.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 shadow">
                            <div className="card-body sport1">
                                <h5 className="card-title">Plan Ganancia Muscular</h5>
                                <p className="card-text">
                                    Planificación para el crecimiento muscular.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 shadow">
                            <div className="card-body sport1">
                                <h5 className="card-title">Plan Salud General</h5>
                                <p className="card-text">
                                    Ejercicios balanceados para sentirte bien cada día.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Beneficios */}
            <section className="beneficios my-5">
                <h2 className="text-center mb-4">¿Por qué elegirnos?</h2>
                <ul className="list-group list-group-flush caja-bot">
                    <li className="list-group-item">🍏 Asesoramiento profesional</li>
                    <li className="list-group-item">🧬 Ejercicios adaptadas a tu metabolismo</li>
                    <li className="list-group-item">📊 Seguimiento de resultados</li>
                </ul>
            </section>
        </div>
        </div>
    );
};
export default SportPage;