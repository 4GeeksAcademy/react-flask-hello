import servicio1 from "../assets/img/servicio1.jpg";
import servicio2 from "../assets/img/servicio2.jpg";
import servicio3 from "../assets/img/servicio3.jpg";

export const Servicios = () => {
    const servicios = [
        { titulo: "Cambio de aceite", imagen: servicio1 },
        { titulo: "Alineación y balanceo", imagen: servicio2 },
        { titulo: "Diagnóstico computarizado", imagen: servicio3 },
    ];

    return (
        <>
            {/* Texto tipo tarjeta */}
            <section className="container my-5">
                <h2 className="text-center fw-bold mb-5">¿Qué Ofrece AutoTekc?</h2>

                <div className="row gy-4">
                    <div className="col-12">
                        <div className="card shadow-sm border-0 rounded-4 position-relative pb-3">
                            <div className="card-body text-center">
                                <h5 className="fw-semibold mb-3">
                                    Del taller a tu pantalla: Transparencia en cada etapa.
                                </h5>
                                <p className="mb-0">
                                    Sabemos lo importante que es tu tiempo y la confianza que depositas en nosotros...
                                </p>
                            </div>
                            <div className="position-absolute bottom-0 start-0 w-100"
                                style={{ height: '8px', backgroundColor: '#002B5B', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}>
                            </div>
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
            </section >


            {/* Tarjetas con imágenes */ }
        < div className = "container py-5" >

        <div className="row g-4 justify-content-center">
                    {servicios.map((servicio, i) => (
                        <div className="col-12 col-sm-6 col-md-4" key={i}>
                            <div className="card border-0 shadow servicio-card overflow-hidden">
                                <div className="position-relative">
                                    <img
                                        src={servicio.imagen}
                                        alt={servicio.titulo}
                                        className="img-fluid w-100 h-100 object-fit-cover"
                                        style={{ height: '250px' }}
                                    />
                                    <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white fw-bold fs-5 text-center px-2">
                                        {servicio.titulo}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </>
    );
};

