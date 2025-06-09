import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import teacherImg from "../assets/img/teacher.png";
import { useAuth } from "../context/AuthProvider";

export const ProfesoresDashboardNavbar = () => {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const [showMenu, setShowMenu] = useState(false);
	const [showSubmenu, setShowSubmenu] = useState(false);
	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};
	const closeMenu = () => {
		setShowMenu(false);
		setShowSubmenu(false)
	};

	const handleLogout = () => {
		logout()
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
								<button
									className="btn text-start w-100 text-black fw-semibold hovNavBtn p-0 border-0 bg-transparent"
									onClick={() => setShowSubmenu(!showSubmenu)}
								>
									Alumnos <i className={`ri-arrow-${showSubmenu ? "up" : "down"}-s-line ms-2`}></i>
								</button>
								{showSubmenu && (
									<ul className="list-unstyled mt-4 ">
										<li className="mb-4">
											<Link to="/teacher/dashboard/alumnos/notas" className="text-black hovNav text-decoration-none" onClick={closeMenu}>
												Notas
											</Link>
										</li>
										<li className="mb-2">
											<Link to="/teacher/dashboard/alumnos/asistencia" className="text-black hovNav text-decoration-none" onClick={closeMenu}>
												Asistencia
											</Link>
										</li>
									</ul>
								)}
							</li>
							<li className="my-3">
								<Link to="/teacher/dashboard/horario" className="text-black text-decoration-none fw-semibold hovNav" onClick={closeMenu}>
									Horario
								</Link>
							</li>
						</ul>
					</div>
					<div className="dropup dropup-center text-center mb-3">
						<button type="button" className="link-body-emphasis text-decoration-none dropdown-toggle show unsetBtn avatar-btn" data-bs-toggle="dropdown" aria-expanded="false">
							<img src={teacherImg} alt="" className="rounded-circle imgUserWidth" />
						</button>
						<ul className="dropdown-menu text-small shadow dropdownNav" data-popper-placement="top-start">
							<li>
								<Link to="/teacher/dashboard/profile" className="dropdown-item" onClick={closeMenu}>Mi Perfil</Link>
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
				<Link to="/teacher/dashboard/profile" className=" navbar-brand fs-2 h1">
					αlpha
				</Link>
			</div>
		</nav>
	);
};