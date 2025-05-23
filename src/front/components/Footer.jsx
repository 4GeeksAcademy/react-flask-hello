
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="bg-warning py-3 mt-auto w-100">
            <div className="container d-flex justify-content-center gap-4">
                <Link to="/contacto" className="text-dark text-decoration-none">
                    Contacto
                </Link>
                <Link to="/sobre-nosotros" className="text-dark text-decoration-none">
                    Sobre nosotros
                </Link>
            </div>
        </footer>
    );
};
