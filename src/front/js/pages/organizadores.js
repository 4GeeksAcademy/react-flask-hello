import React from "react";
import "../../styles/organizadores.css";
import img5 from "../../img/organizadores/img5.jpg";
import img6 from "../../img/organizadores/img6.jpg";
import img8 from "../../img/organizadores/img8.jpg";
import { Link } from "react-router-dom";

const Organizadores = () => {

    return (
        <div className="container" id="organizadores">
            <div className="row align-items-center">
                <div className="col-lg-6 col-md-6 order-2 order-md-1 mt-4 pt-2 mt-sm-0 opt-sm-0">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6 col-6">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 mt-4 pt-2">
                                    <div className="card work-desk rounded border-0 shadow-lg overflow-hidden">
                                        <img src={img6} className="img-fluid" alt="Image" />
                                        <div className="img-overlay bg-dark"></div>
                                    </div>
                                </div>

                                <div className="col-12">

                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-6">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <div className="card work-desk rounded border-0 shadow-lg overflow-hidden">
                                        <img src={img8} className="img-fluid" alt="Image" />
                                        <div className="img-overlay bg-dark"></div>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12 mt-4 pt-2">
                                    <div className="card work-desk rounded border-0 shadow-lg overflow-hidden">
                                        <img src={img5} className="img-fluid" alt="Image" />
                                        <div className="img-overlay bg-dark"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6 col-12 order-1 order-md-2">
                    <div className="section-title ml-lg-5">
                        <h5 className="text-custom font-weight-normal mb-3">¿Organizas Eventos Deportivos?</h5>
                        <h4 className="title mb-4">
                            Nuestra misión <br />
                            es hacerte la vida más fácil.
                        </h4>
                        <p className="text-muted mb-0">Crea tus eventos deportivos en nuestra plataforma y organízalos de manera digital.
                            Integra todo en un sólo sitio. Con nuestro plan de comisiones no cobramos cuota por registrarte en nuestro sitio web.</p>
                            <div className="mt-2 text-center">
                                <Link to="/cuenta">
                                    <span className="btn btn-primary" href="" role="button">Regístrate Gratis</span>
                                </Link>
                            </div>
                        <div className="row">
                            <div className="col-lg-6 mt-4 pt-2">
                                <div className="media align-items-center rounded shadow p-3">
                                    <i className="fa fa-image h4 mb-0 text-custom"></i>
                                    <h6 className="ml-3 mb-0">Publica tus eventos</h6>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-4 pt-2">
                                <div className="media align-items-center rounded shadow p-3">
                                    <i className="fa fa-file-download h4 mb-0 text-custom"></i>
                                    <h6 className="ml-3 mb-0">Registra los equipos</h6>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-4 pt-2">
                                <div className="media align-items-center rounded shadow p-3">
                                    <i className="fa fa-user h4 mb-0 text-custom"></i>
                                    <h6 className="ml-3 mb-0">Cobra la inscripción</h6>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-4 pt-2">
                                <div className="media align-items-center rounded shadow p-3">
                                    <i className="fa fa-play h4 mb-0 text-custom"></i>
                                    <h6 className="ml-3 mb-0">Organiza los juegos</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Organizadores;