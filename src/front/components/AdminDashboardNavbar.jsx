import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import { useAuth } from "../context/AuthProvider";

export const AdminDashboardNavbar = () => {
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
							{/* <li className="my-3">
								<div className="btn-group dropend">
									<Link className="btn dropdown-toggle text-black text-decoration-none fw-semibold hovNav p-0 border-0 shadow-none" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" >
										Alumnos
									</Link>
									<ul className="dropdown-menu dropdown-menu-center-vertical ms-3">
										<li>
											<Link to="/admin/dashboard/alumnos/notas" className="dropdown-item" onClick={closeMenu}>
												Notas
											</Link>
										</li>
										<li>
											<hr className="dropdown-divider" />
										</li>
										<li>
											<Link to="/admin/dashboard/alumnos/asistencia" className="dropdown-item" onClick={closeMenu}>
												Asistencia
											</Link>
										</li>
									</ul>
								</div>
							</li>
							<li className="my-3">
								<Link to="/admin/dashboard/profesores" className="text-black text-decoration-none fw-semibold hovNav" onClick={closeMenu}>
									Profesores
								</Link>
							</li> */}
							<li className="my-3">
								<Link to="/admin/dashboard/solicitudes" className="text-black text-decoration-none fw-semibold hovNav" onClick={closeMenu}>
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
								<Link to="/admin/dashboard/profile" className="dropdown-item" onClick={closeMenu}>Mi Perfil</Link>
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
				<Link to="/admin/dashboard/profile" className=" navbar-brand fs-2 h1">
					αlpha
				</Link>
			</div>
		</nav>
	);
};