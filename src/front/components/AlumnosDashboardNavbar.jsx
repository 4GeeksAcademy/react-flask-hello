import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'

import studentImg from "../assets/img/students.png";
import { useAuth } from "../context/AuthProvider";

export const AlumnosDashboardNavbar = () => {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const [showMenu, setShowMenu] = useState(false);
	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};
	const closeMenu = () => {
		setShowMenu(false);
	};

	const handleLogout = () => {
		logout();
		navigate("/");
	}

	return (
		<nav className="navbar navbar-light bg-light d-flex justify-content-start align-items-center gap-3">
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
							<li className="my-3">
								<Link to="/student/dashboard/notas" className="text-black text-decoration-none fw-semibold hovNav" onClick={closeMenu}>
									Notas
								</Link>
							</li>
							<li className="my-3">
								<Link to="/student/dashboard/horario" className="text-black text-decoration-none fw-semibold hovNav" onClick={closeMenu}>
									Horario
								</Link>
							</li>
						</ul>
					</div>
					<div className="dropup dropup-center text-center mb-3">
						<button type="button" className="link-body-emphasis text-decoration-none dropdown-toggle show unsetBtn avatar-btn" data-bs-toggle="dropdown" aria-expanded="false">
							<img src={studentImg} alt="" className="rounded-circle imgUserWidth" />
						</button>
						<ul className="dropdown-menu text-small shadow dropdownNav" data-popper-placement="top-start">
							<li>
								<Link to="/student/dashboard/profile" className="dropdown-item" >Mi Perfil</Link>
							</li>
							<li>
								<hr className="dropdown-divider" />
							</li>
							<li>
								<button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar Sesión</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="d-flex align-items-center">
				<Link to="/student/dashboard/profile" className=" navbar-brand fs-2 h1">
					αlpha
				</Link>
			</div>
		</nav>
	);
};