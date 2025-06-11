import { Link } from "react-router-dom";
import "../pages/Footer.css";

export const Footer = () => {
    return (
        <footer className="bg-dark py-3 mt-auto w-100">
            <div className="container d-flex align-items-center justify-content-between flex-wrap">
                <div>
                    <div className="d-flex gap-2 align-items-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" height="15" style={{ background: "#fff", borderRadius: 2, padding: "1px" }} />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" height="15" style={{ background: "#fff", borderRadius: 2, padding: "1px" }} />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" height="15" style={{ background: "#fff", borderRadius: 2, padding: "1px" }} />
                        <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" height="15" style={{ background: "#fff", borderRadius: 2, padding: "1px" }} />
                    </div>
                    <div className="text-white-50 small mt-1">
                        © 2025 | Vértika Limited | Todos los derechos son reservados. | We Create Champions.
                    </div>
                </div>
                <div className="d-flex gap-4">
                    <Link to="/contacto" className="text-white text-decoration-none">
                        Contacto
                    </Link>
                    <Link to="/sobre-nosotros" className="text-white text-decoration-none">
                        Sobre nosotros
                    </Link>
                    <button
                        onClick={() => window.open("https://www.instagram.com/vertika_apparel/", "_blank", "noopener,noreferrer")}
                        className="btn btn-outline-light btn-sm icon"
                        aria-label="Instagram"
                    >
                        <i className="bi bi-instagram"></i>
                    </button>
                    <button
                        onClick={() => window.open("https://github.com/4GeeksAcademy/Proyecto-final-JRJF-B-F", "_blank", "noopener,noreferrer")}
                        className="btn btn-outline-light btn-sm icon2"
                        aria-label="GitHub"
                    >
                        <i className="bi bi-github"></i>
                    </button>
                </div>
            </div>
        </footer>
    );
};
