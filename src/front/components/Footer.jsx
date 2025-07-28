
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="festquila-footer py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6 mb-4">
                        <h5 className="text-uppercase mb-4 fw-bold">Festquila</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/about" className="text-decoration-none text-white-50">Sobre nosotros</Link></li>
                            <li><Link to="/press" className="text-decoration-none text-white-50">Prensa</Link></li>
                            <li><Link to="/contact" className="text-decoration-none text-white-50">Contacto</Link></li>
                            <li><Link to="/help" className="text-decoration-none text-white-50">Centro de ayuda</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-3 col-sm-6 mb-4">
                        <h5 className="text-uppercase mb-4 fw-bold">Organiza con nosotros</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/publish-event" className="text-decoration-none text-white-50">Publica tu evento</Link></li>
                            <li><Link to="/promote-music" className="text-decoration-none text-white-50">Promueve tu música</Link></li>
                            <li><Link to="/collaborate" className="text-decoration-none text-white-50">Colaboraciones</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-2 col-sm-6 mb-4">
                        <h5 className="text-uppercase mb-4 fw-bold">Síguenos</h5>
                        <ul className="list-unstyled d-flex flex-column">
                            <li><a href="https://facebook.com/festquila" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white-50 mb-2 d-inline-block"><i className="fab fa-facebook-f me-2"></i> Facebook</a></li>
                            <li><a href="https://instagram.com/festquila" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white-50 mb-2 d-inline-block"><i className="fab fa-instagram me-2"></i> Instagram</a></li>
                            <li><a href="https://twitter.com/festquila" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white-50 mb-2 d-inline-block"><i className="fab fa-twitter me-2"></i> X (Twitter)</a></li>
                            <li><a href="https://tiktok.com/festquila" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white-50 mb-2 d-inline-block"><i className="fab fa-tiktok me-2"></i> TikTok</a></li>
                            <li><a href="https://youtube.com/festquila" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white-50 mb-2 d-inline-block"><i className="fab fa-youtube me-2"></i> YouTube</a></li>
                        </ul>
                    </div>

                    <div className="col-md-2 col-sm-6 mb-4">
                        <h5 className="text-uppercase mb-4 fw-bold">Descubre Eventos</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/events/today" className="text-decoration-none text-white-50">Hoy</Link></li>
                            <li><Link to="/events/upcoming" className="text-decoration-none text-white-50">Próximos</Link></li>
                            <li><Link to="/events/genre/techno" className="text-decoration-none text-white-50">Techno</Link></li>
                            <li><Link to="/events/city/madrid" className="text-decoration-none text-white-50">Madrid</Link></li>
                            <li><Link to="/events/city/barcelona" className="text-decoration-none text-white-50">Barcelona</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-2 col-sm-12 mb-4 text-center text-md-start">
                        <h5 className="text-uppercase mb-4 fw-bold">Descarga nuestra App</h5>
                        <p className="text-white-50 small">Descubre los próximos planes y experiencias que mejor se adapten a ti.</p>
                        <div className="d-flex flex-column align-items-center align-items-md-start">
                            <a href="#" target="_blank" rel="noopener noreferrer" className="mb-2">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" alt="Download on the App Store" style={{ height: '40px' }} />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" alt="Get it on Google Play" style={{ height: '40px' }} />
                            </a>
                        </div>
                    </div>
                </div>
                
                <hr className="bg-white my-4" />

                <div className="row">
                    <div className="col-12 text-center text-white-50">
                        <p className="mb-0">
                            © {new Date().getFullYear()} Festquila. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
