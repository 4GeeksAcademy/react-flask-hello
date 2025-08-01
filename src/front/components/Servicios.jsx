import { Link } from "react-router-dom";
import servicio1 from "../assets/img/servicio1.jpg";
import servicio2 from "../assets/img/servicio2.jpg";
import servicio3 from "../assets/img/servicio3.jpg";
import experience from "../assets/img/experience.svg";
import calidad from "../assets/img/calidad.svg";
import wallet from "../assets/img/wallet.svg";
import cumplimiento from "../assets/img/cumplimiento.svg";
import profesionalismo from "../assets/img/profesionalismo.svg";
import garantia from "../assets/img/garantia.svg";
import IG from "../assets/img/IG.svg";
import WA from "../assets/img/WA.svg";
import FB from "../assets/img/FB.svg";





export const Servicios = () => {
    const infoCards = [
        {
            titulo: "Del taller a tu pantalla: Transparencia en cada etapa.",
            texto: "Sabemos lo importante que es tu tiempo y la confianza que depositas en nosotros. Por eso, en AutoTekc, te ofrecemos un proceso completamente transparente. Mira cómo avanzan los servicios de tu auto, revisa tu historial y gestiona tus vehículos registrados con total comodidad. Olvídate de las esperas y dudas."
        },
        {
            titulo: "Expertos a tu servicio, tu ritmo es lo primero!",
            texto: "¿Necesitas un diagnóstico o ya sabes qué servicio requiere tu auto? Nuestro equipo de especialistas está listo para asesorarte, o si lo prefieres, elige los servicios que desees con la facilidad de unos pocos clics. Eficiencia, calidad y control, directamente en tus manos."
        },
        {
            titulo: "Tu taller, tus reglas: Control total sobre tu vehículo.",
            texto: " Imagina tener el control total sobre el cuidado de tu auto. En Autotekc, lo hicimos posible. Desde agendar tu cita y seleccionar los servicios que necesitas, hasta seguir el proceso de tu vehículo en tiempo real y revisar tu historial, todo está al alcance de tu mano. Nos enfocamos en darte la confianza y la claridad que mereces, eliminando las sorpresas y optimizando tu tiempo."
        }
    ];

    const servicios = [
        { titulo: "Cambio de aceite", imagen: servicio1 },
        { titulo: "Alineación y balanceo", imagen: servicio2 },
        { titulo: "Diagnóstico computarizado", imagen: servicio3 }
    ];

    return (
        <>
            <section className="container my-5">
                <h2 id="about" className="text-center fw-bold mb-5">¿Qué Ofrece AutoTekc?</h2>

                <div className="row gy-4">
                    {infoCards.map((item, i) => (
                        <div className="col-12" key={i}>
                            <div className="card shadow-sm border-0 rounded-4 position-relative pb-3">
                                <div className="card-body text-center">
                                    <h5 className="fw-semibold mb-3">{item.titulo}</h5>
                                    <p className="mb-0">{item.texto}</p>
                                </div>
                                <div
                                    className="position-absolute bottom-0 start-0 w-100"
                                    style={{
                                        height: "8px",
                                        backgroundColor: "#002B5B",
                                        borderBottomLeftRadius: "1rem",
                                        borderBottomRightRadius: "1rem"
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            <div id="servicios" className="container py-5">
                <div className="row g-4 justify-content-center">
                    {servicios.map((servicio, i) => (
                        <div className="col-12 col-sm-6 col-md-4" key={i}>
                            <div className="card border-0 shadow servicio-card overflow-hidden">
                                <div className="position-relative">
                                    <img
                                        src={servicio.imagen}
                                        alt={servicio.titulo}
                                        className="img-fluid w-100 h-100"
                                        style={{ height: "250px", objectFit: "cover" }}
                                    />
                                    <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white text-center px-2">
                                        <h5 className="fw-bold">{servicio.titulo}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center my-5">
                    <Link
                        to="/agendar-cita"
                        className="btn btn-lg px-4 rounded-pill shadow"
                        style={{ backgroundColor: '#003366', color: 'white' }}
                    >
                        ¡Agenda tu cita aquí!
                    </Link>
                </div>


                <section id= "about" className="container my-5">
                    <div className="vision-box">
                        <h2 className="fw-bold">Visión</h2>
                        <p>
                            En AutoTekc, nacimos de una visión clara y una necesidad palpable: transformar la experiencia de llevar tu auto al servicio.
                            Cansados de la opacidad, los procesos inciertos y la sensación de desconexión que a menudo acompaña la mecánica automotriz,
                            decidimos crear un espacio donde la confianza, la transparencia y la agilidad fueran los pilares fundamentales.
                            Entendemos que tu auto es más que un medio de transporte; es una extensión de tu vida,
                            y por eso, nuestra idea germinó de la inquietud de ofrecerte la tranquilidad de saber exactamente qué sucede con él, en todo momento.
                        </p>
                    </div>

                    <div className="row text-center mt-5">
                        <div className="col-sm-6 col-md-4 icon-feature">
                            <img src={experience} alt="experience" width={200} />
                            <h5 className="mt-2">Experiencia</h5>
                            <p>Va casi 20 años cuidando tu auto.</p>
                        </div>

                        <div className="col-sm-6 col-md-4 icon-feature">
                            <img src={calidad} alt="calidad" width={200} />
                            <h5 className="mt-2">Calidad</h5>
                            <p>Productos de máxima calidad, pintura de fábrica e insumos óptimos.</p>
                        </div>

                        <div className="col-sm-6 col-md-4 icon-feature">
                           <img src={wallet} alt="wallet" width={200} />
                            <h5 className="mt-2">Precio Justo</h5>
                            <p>La calidad tiene un precio, igualmente tiene la satisfacción garantizada.</p>
                        </div>

                        <div className="col-sm-6 col-md-4 icon-feature">
                            <img src={cumplimiento} alt="cumplimiento" width={200} />
                            <h5 className="mt-2">Cumplimiento</h5>
                            <p>El tiempo de nuestros clientes es valioso, por eso el cumplimiento es importante para nosotros.</p>
                        </div>

                        <div className="col-sm-6 col-md-4 icon-feature">
                            <img src={profesionalismo} alt="profesionalismo" width={200} />
                            <h5 className="mt-2">Profesionalismo</h5>
                            <p>Personal profesional, actualizado y altamente capacitado.</p>
                        </div>

                        <div className="col-sm-6 col-md-4 icon-feature">
                           <img src={garantia} alt="garantia" width={200} />
                            <h5 className="mt-2">Garantía</h5>
                            <p>Ofrecemos garantía de por vida en nuestro trabajo.</p>
                        </div>
                    </div>
                </section>
            </div >

            <div className="container my-5">
                <div className="row contacto mb-5">
                    <div className="col-md-6">
                        <h4>Contactanos</h4>
                        <p><strong>Teléfonos:</strong> +00 100-00018 / +00 100-00019</p>
                        <p><strong>Correo:</strong> <a href="mailto:online@autotek.com">online@autotek.com</a></p>

                        <div className="social-icons mt-4">
                             <img src={IG} alt="IG" width={50} className="me-3"  />
                             <img src={WA} alt="WA" width={50} className="me-3" />
                             <img src={FB} alt="FB" width={50} />
                        </div>
                    </div>

                    <div id= "contactenos" className="col-md-6">
                        <form>
                            <input type="text" className="form-control mb-3" placeholder="Nombre y Apellido" required />
                            <input type="email" className="form-control mb-3" placeholder="Correo Electrónico" required />
                            <input type="tel" className="form-control mb-3" placeholder="Teléfono" />
                            <textarea className="form-control mb-3" rows="4" placeholder="Mensaje / Consulta" required></textarea>
                            <button type="submit" className="btn"
                            style={{ backgroundColor: '#003366', color: 'white' }}>Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );

};

