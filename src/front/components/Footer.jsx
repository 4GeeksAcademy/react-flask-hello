import { Link } from "react-router-dom";
import "../pages/Footer.css";

export const Footer = () => {
    return (
        <footer className="bg-dark py-3 mt-auto w-100">
            <div className="container justify-content-end d-flex gap-4">
                <Link to="/contacto" className="text-white text-decoration-none">
                    Contacto
                </Link>
                <Link to="/sobre-nosotros" className="text-white text-decoration-none">
                    Sobre nosotros
                </Link>
                <button
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-light btn-sm icon"
                    aria-label="Instagram"
                >
                    <i className="bi bi-instagram"></i>
                </button>
                <button
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-light btn-sm icon2"
                    aria-label="GitHub"
                >
                    <i className="bi bi-github"></i>
                </button>
            </div>
        </footer>
    );
};
