import { Link } from "react-router-dom";
import React, { useState } from 'react'

export const DashboardNavbar = () => {
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
							<li className="my-3">
								<div className="btn-group dropend">
									<button type="button" className="btn dropdown-toggle text-black text-decoration-none fw-semibold hovNav p-0 border-0 shadow-none" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
										Alumnos
									</button>
									<ul className="dropdown-menu dropdown-menu-center-vertical ms-3">
										<li>
											<Link to="/admin/alumnos/notas" className="dropdown-item" onClick={closeMenu}>
												Notas
											</Link>
										</li>
										<li>
											<hr className="dropdown-divider" />
										</li>
										<li>
											<Link to="/admin/alumnos/asistencia" className="dropdown-item" onClick={closeMenu}>
												Asistencia
											</Link>
										</li>
										<li>
											<hr className="dropdown-divider" />
										</li>
										<li>
											<Link to="/admin/alumnos/pagos" className="dropdown-item" onClick={closeMenu}>
												Pagos
											</Link>
										</li>
										<li>
											<Link to="/admin/dashboard/solicitudes" className="dropdown-item" onClick={closeMenu}>
												Solicitudes
											</Link>
										</li>
									</ul>
								</div>
							</li>
							<li className="my-3">
								<Link to="/admin/profesores" className="text-black text-decoration-none fw-semibold hovNav" onClick={closeMenu}>
									Profesores
								</Link>
							</li>
							<li className="my-3">
								<Link to="/admin/solicitudes" className="text-black text-decoration-none fw-semibold hovNav" onClick={closeMenu}>
									Solicitudes
								</Link>
							</li>
						</ul>
					</div>
					<div className="dropup dropup-center text-center mb-3">
						<button type="button" className="link-body-emphasis text-decoration-none dropdown-toggle show unsetBtn avatar-btn" data-bs-toggle="dropdown" aria-expanded="false">
							<img src="https://www.w3schools.com/w3css/img_avatar3.png" alt="" className="rounded-circle imgUserWidth" />
						</button>
						<ul className="dropdown-menu text-small shadow dropdownNav" data-popper-placement="top-start">
							<li>
								<Link to="/admin/profile" className="dropdown-item" onClick={closeMenu}>Mi Perfil</Link>
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