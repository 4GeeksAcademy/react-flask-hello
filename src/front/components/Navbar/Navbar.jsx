import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";

import "./Navbar.css";
import logo from "../../assets/images/flow-logo.svg";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();
	const [problems, setProblems] = useState([]);
	const [newProblem, setNewProblem] = useState("");
	const username = store.user?.username || "User";

	useEffect(() => {
		const savedProblems = localStorage.getItem('problems');
		if (savedProblems) {
			setProblems(JSON.parse(savedProblems));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('problems', JSON.stringify(problems));
	}, [problems]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newProblem.trim() !== "") {
			// Añadir nuevo problema con fecha y hora
			const problemWithTimestamp = {
				id: Date.now(),
				text: newProblem,
				date: new Date().toLocaleString()
			};
			setProblems([...problems, problemWithTimestamp]);
			setNewProblem("");
		}
	};

	const deleteProblem = (id) => {
		setProblems(problems.filter(problem => problem.id !== id));
	};

	const handleLogout = () => {
		dispatch({ type: "logout" })
		navigate("/")
	}

	return (
		<>
			<div className="navbar-container">
				{/* Barra superior con logo y usuario */}
				<div className="top-navbar">
					<div className="logo-container">
						<img src={logo} alt="Flow Logo" className="navbar-logo" />
					</div>

					<div className="navbar-controls">
						<button className="btn-report" data-bs-toggle="modal" data-bs-target="#problemasModal">
							<i className="bi bi-exclamation-triangle"></i>
							<span>Report</span>
						</button>

						{store.token && (
							<div className="user-dropdown">
								<button className="btn-user dropdown-toggle" data-bs-toggle="dropdown">
									<i className="bi bi-person-circle"></i>
									<span>{username}</span>
								</button>
								<ul className="dropdown-menu dropdown-menu-end">
									<li><span className="dropdown-item user-name">{username}</span></li>
									<li><hr className="dropdown-divider" /></li>
									<li>
										<button
											className="dropdown-item logout"
											onClick={handleLogout}
										>
											Logout
										</button>
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>

				{/* Modal "PROBLEMAS" */}
				<div className="modal fade" id="problemasModal" tabIndex="-1" aria-labelledby="problemasModalLabel" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="problemasModalLabel">
									<i className="bi bi-exclamation-triangle"></i> Reportar problema
								</h5>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
							</div>
							<div className="modal-body">
								{/* Formulario para añadir problemas */}
								<form onSubmit={handleSubmit}>
									<div className="form-group mb-3">
										<label htmlFor="problemDescription" className="form-label">Descripción del problema</label>
										<textarea
											id="problemDescription"
											className="form-control"
											placeholder="Describe detalladamente el problema encontrado..."
											value={newProblem}
											onChange={(e) => setNewProblem(e.target.value)}
											rows="3"
											required
										></textarea>
									</div>
									<div className="d-grid">
										<button type="submit" className="btn-submit">
											<i className="bi bi-plus-circle"></i> Registrar problema
										</button>
									</div>
								</form>

								{/* Lista de problemas */}
								{problems.length > 0 && (
									<div className="problems-list mt-4">
										<h6 className="list-title">Problemas recientes</h6>
										{problems.slice().reverse().map((problem) => (
											<div key={problem.id} className="problem-card">
												<div className="problem-header">
													<span className="problem-date">{problem.date}</span>
													<button
														className="btn-delete"
														onClick={() => deleteProblem(problem.id)}
														title="Eliminar"
													>
														<i className="bi bi-x"></i>
													</button>
												</div>
												<div className="problem-text">
													{problem.text}
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Fila de botones de navegación */}
			<div className="sub-navigation">
				<div className="container-fluid">
					<div className="row justify-content-center my-2">
						<div className="col-lg-2 col-md-4 col-sm-4 col-6 mb-2">
							<Link to="/clients" className="nav-button btn-clients">
								<i className="fa-solid fa-circle-user"></i>
								<span>CLIENTS</span>
							</Link>
						</div>
						<div className="col-lg-2 col-md-4 col-sm-4 col-6 mb-2">
							<Link to="/newclient" className="nav-button btn-new-client">
								<div>
									<i className="fa-solid fa-plus"></i>
									<i className="fa-solid fa-circle-user"></i>
								</div>
								<span>NEW CLIENTS</span>
							</Link>
						</div>
						<div className="col-lg-2 col-md-4 col-sm-4 col-6 mb-2">
							<Link to="/appointments" className="nav-button btn-appointments">
								<i className="fa-solid fa-calendar-check"></i>
								<span>APPOINTMENTS</span>
							</Link>
						</div>
						<div className="col-lg-2 col-md-4 col-sm-4 col-6 mb-2">
							<Link to="/calendar" className="nav-button btn-calendar">
								<i className="fa-solid fa-building"></i>
								<span>CALENDAR</span>
							</Link>
						</div>
						<div className="col-lg-2 col-md-4 col-sm-4 col-6 mb-2">
							<Link to="/business" className="nav-button btn-business">
								<i className="fa-solid fa-building"></i>
								<span>BUSINESS</span>
							</Link>
						</div>
						<div className="col-lg-2 col-md-4 col-sm-4 col-6 mb-2">
							<Link to="/services" className="nav-button btn-services">
								<i className="fa-solid fa-paperclip"></i>
								<span>SERVICES</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};