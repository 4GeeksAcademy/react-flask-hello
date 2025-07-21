import { Link } from "react-router-dom";


export const Servicios = () => {
    return (
        <section className="container my-5">
            <h2 className="text-center fw-bold mb-5">¿Qué Ofrece AutoTekc?</h2>

            <div className="row gy-4">
                {/* Tarjeta 1 */}
                <div className="col-12">
                    <div className="card shadow-sm border-0 rounded-4 position-relative pb-3">
                        <div className="card-body text-center">
                            <h5 className="fw-semibold mb-3">
                                Del taller a tu pantalla: Transparencia en cada etapa.
                            </h5>
                            <p className="mb-0">
                                Sabemos lo importante que es tu tiempo y la confianza que depositas en nosotros. Por eso, en AutoTekc,
                                te ofrecemos un proceso completamente transparente. Mira cómo avanzan los servicios de tu auto,
                                revisa tu historial y gestiona tus vehículos registrados con total comodidad. Olvídate de las esperas y las dudas.
                            </p>
                        </div>
                        <div
                            className="position-absolute bottom-0 start-0 w-100"
                            style={{ height: '8px', backgroundColor: '#002B5B', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}
                        ></div>
                    </div>
                </div>

                {/* Tarjeta 2 */}
                <div className="col-12">
                    <div className="card shadow-sm border-0 rounded-4 position-relative pb-3">
                        <div className="card-body text-center">
                            <h5 className="fw-semibold mb-3">
                                Expertos a tu servicio, tu ritmo es lo primero!
                            </h5>
                            <p className="mb-0">
                                ¿Necesitas un diagnóstico o ya sabes qué servicio requiere tu auto? Nuestro equipo de especialistas
                                está listo para asesorarte, o si lo prefieres, elige los servicios que desees con la facilidad de unos pocos clics.
                                Eficiencia, calidad y control, directamente en tus manos.
                            </p>
                        </div>
                        <div
                            className="position-absolute bottom-0 start-0 w-100"
                            style={{ height: '8px', backgroundColor: '#002B5B', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}
                        ></div>
                    </div>
                </div>

                {/* Tarjeta 3 */}
                <div className="col-12">
                    <div className="card shadow-sm border-0 rounded-4 position-relative pb-3">
                        <div className="card-body text-center">
                            <h5 className="fw-semibold mb-3">
                                Tu taller, tus reglas: Control total sobre tu vehículo.
                            </h5>
                            <p className="mb-0">
                                Imagina tener el control total sobre el cuidado de tu auto. En Autotekc, lo hicimos posible.
                                Desde agendar tu cita y seleccionar los servicios que necesitas, hasta seguir el proceso de tu vehículo
                                en tiempo real y revisar tu historial, todo está al alcance de tu mano. Nos enfocamos en darte la confianza
                                y la claridad que mereces, eliminando las sorpresas y optimizando tu tiempo.
                            </p>
                        </div>
                        <div
                            className="position-absolute bottom-0 start-0 w-100"
                            style={{ height: '8px', backgroundColor: '#002B5B', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
