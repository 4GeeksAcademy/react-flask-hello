import { Link } from "react-router-dom";
import LogoNavbar from "../assets/img/LogoNavbar.svg";
import LogoNavMovil from "../assets/img/LogoNavMovil.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const Navbar = () => {
   
	return (
		<>
            {/* --- NAVBAR DE ESCRITORIO --- */}
			<nav className="container my-5 d-none d-lg-block">
				<div className="navbar fixed-top navbar-expand-md custom-navbar rounded-pill px-4 my-3 mx-5">
					<Link className="navbar-brand px-3" to="/">
						<img src={LogoNavbar} alt="CloudTech Logo" className="navbar-logo" />
					</Link>

					<div className="d-none d-lg-flex justify-content-end w-100">
						<ul className="navbar-nav align-items-center gap-3">
							<li className="nav-item">
								<Link className="nav-link no-shift-hover" to="/">Inicio</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link no-shift-hover" to="/about">Nosotros</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link no-shift-hover" to="/services">Servicios</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link no-shift-hover" to="/projects">Proyectos</Link>
							</li>
							<li className="nav-item">
								<Link className="btn btn-contact rounded-pill" to="/contact">Contáctanos</Link>
							</li>
						</ul>
					</div>	
				</div>
			</nav>

            {/* --- NAVBAR MÓVIL (TRIGGER Y OFFCANVAS) --- */}
			<div className="d-lg-none mobile-nav-trigger">
				<img src={LogoNavbar} alt="CloudTech Logo" className="navbar-logo" />
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#mobileMenuOffcanvas"
					aria-controls="mobileMenuOffcanvas"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
			</div>

			<div
				className="offcanvas offcanvas-start custom-mobile-menu"
				tabIndex="-1"
				id="mobileMenuOffcanvas"
				aria-labelledby="mobileMenuOffcanvasLabel"
			>
				<div className="offcanvas-body">
					<div className="mobile-menu-header">
						<h5 className="offcanvas-title" id="mobileMenuOffcanvasLabel">
							<img src={LogoNavMovil} alt="CloudTech Logo Movil" className="navbar-logo-1" />
						</h5>
						<button
							type="button"
							className="btn-close btn-close-white"
							data-bs-dismiss="offcanvas"
							aria-label="Close"
						>
						</button>
					</div>

					<div className="mobile-menu-content">
						<ul className="navbar-nav gap-4">
                            <li className="nav-item">
								<Link className="nav-link no-shift-hover mobile-link" to="/">Inicio</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link no-shift-hover mobile-link" to="/about">Nosotros</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link no-shift-hover mobile-link" to="/services">Servicios</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link no-shift-hover mobile-link" to="/projects">Proyectos</Link>
							</li>
						</ul>
						<div className="mt-5 w-100 px-4">
							<Link className="btn btn-contact rounded-pill mobile-btn" to="/contact">Contáctanos</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};