import { Link } from "react-router-dom";
import LogoNavbar from "../assets/img/LogoNavbar.svg";
import LogoNavMovil from "../assets/img/LogoNavMovil.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {

	return (
		<>
			{/* --- NAVBAR DE ESCRITORIO --- */}
			{/* <div className="container w-100 mb-5"></div> */}
			<nav className="navbar fixed-top navbar-expand-md d-none d-lg-block py-3 justify-content-center">
				<div className="container bg-black rounded-pill px-5 py-1 d-flex justify-content-between align-items-center">
					<Link className="navbar-brand" to="/">
						<img src={LogoNavbar} alt="CloudTech Logo" className="h-auto w-auto" />
					</Link>

					{/* <div className="d-none d-lg-flex justify-content-end w-100"> */}
					<ul className="navbar-nav flex-row align-items-center gap-3">
						<li className="nav-item">
							<Link className="nav-link text-white" to="/">Inicio</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-white" to="/about">Nosotros</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-white" to="/services">Servicios</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-white" to="/projects">Proyectos</Link>
						</li>
						<li className="nav-item">
							<Link className="btn btn-outline-custom-yellow rounded-pill py-2 px-4 fw-medium" to="/contact">Contáctanos</Link>
						</li>
					</ul>
					{/* </div>	 */}
				</div>
			</nav>

			{/* --- NAVBAR MÓVIL (TRIGGER Y OFFCANVAS) --- */}
			<div className="d-lg-none fixed-top bg-black d-flex justify-content-between align-items-center mx-3 my-4 p-3 rounded-pill">
				<img src={LogoNavbar} alt="CloudTech Logo" className="h-auto w-auto" />
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#mobileMenuOffcanvas"
					aria-controls="mobileMenuOffcanvas"
				>
					<FontAwesomeIcon icon={faBars} className="fa-icon-yellow" size="xl" />
				</button>
			</div>

			<div
				className="offcanvas offcanvas-start custom-mobile-menu vh-100 vw-100"
				tabIndex="-1"
				id="mobileMenuOffcanvas"
				aria-labelledby="mobileMenuOffcanvasLabel"
			>
				<div className="offcanvas-body d-flex flex-column">
					<div className="bg-custom-mobile-header d-flex justify-content-between align-items-center mx-3 my-4 p-3 rounded-pill">
						<h5 className="offcanvas-title mb-0" id="mobileMenuOffcanvasLabel">
							<img src={LogoNavMovil} alt="CloudTech Logo Movil" className="h-auto w-auto" />
						</h5>
						<button
							type="button"
							className="btn"
							data-bs-dismiss="offcanvas"
							aria-label="Close"
						>
							<FontAwesomeIcon icon={faXmark} className="text-white" size="xl" />
						</button>
					</div>

					<div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
						<ul className="navbar-nav gap-4">
							<li className="nav-item">
								<Link className="nav-link text-white fs-2 fw-medium" to="/">Inicio</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link text-white fs-2 fw-medium" to="/about">Nosotros</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link text-white fs-2 fw-medium" to="/services">Servicios</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link text-white fs-2 fw-medium" to="/projects">Proyectos</Link>
							</li>
						</ul>
						<div className="mt-5 w-100 px-4">
							<Link className="btn btn-outline-custom-yellow rounded-pill w-100 py-2 fs-5 fw-bold" to="/contact">Contáctanos</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};