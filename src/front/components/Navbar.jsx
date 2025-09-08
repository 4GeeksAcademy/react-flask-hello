import { Link } from "react-router-dom";
import React, { useState } from 'react'

export const Navbar = () => {
	const [showMenu, setShowMenu] = useState(false);
	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};
	const closeMenu = () => {
		setShowMenu(false);
	};

	return (
		<nav className="navbar navbar-light bg-light d-flex justify-content-start align-items-center gap-3 mb-5">
			<div>
				<button className="unsetBtn ms-5 fs-4" onClick={toggleMenu}>
					<i className="ri-menu-line"></i>
				</button>
				<div className={`menu-overlay ${showMenu ? 'active' : ''}`} onClick={closeMenu}></div>
				<div className={`sidenav ${showMenu ? "sidenav-open" : ""} d-flex flex-column  justify-content-between`}>
					<div className="d-flex justify-content-between align-items-center mb-3 mb-5">
						<h4 className="m-0 ps-3"> αlpha </h4>
						<button className="unsetBtn" onClick={closeMenu}>
							<i className="ri-menu-line fs-4"></i>
						</button>
					</div>
					<div className="flex-grow-1">
						<ul className="list-unstyled text-start text-decoration-none d-flex flex-column gap-3 ps-3">
							<li className="py-3"><a href="#inicio" className="text-black text-decoration-none fw-semibold hovNav">Perfil</a></li>
							<li className="my-3"><a href="#inicio" className="text-black text-decoration-none fw-semibold hovNav">Notas de alumnos</a></li>
							<li className="my-3"><a href="#inicio" className="text-black text-decoration-none fw-semibold hovNav">Asistencia de alumnos</a></li>
						</ul>
					</div>
					<div className="dropup dropup-center text-center mb-3">
						<button type="button" className="link-body-emphasis text-decoration-none dropdown-toggle show unsetBtn avatar-btn" data-bs-toggle="dropdown" aria-expanded="false">
							<img src="https://www.w3schools.com/w3css/img_avatar3.png" alt="" className="rounded-circle imgUserWidth" />
						</button>
						<ul className="dropdown-menu text-small shadow dropdownNav" data-popper-placement="top-start">
							<li>
								<Link to="/profile" className="dropdown-item">Mi Perfil</Link>
							</li>
							<li>
								<hr className="dropdown-divider" />
							</li>
							<li>
								<a className="dropdown-item text-danger" href="#">Cerrar Sesión</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="d-flex align-items-center">
				<Link to="/" className=" navbar-brand fs-2 h1">
					αlpha
				</Link>
			</div>
		</nav>
	);
};