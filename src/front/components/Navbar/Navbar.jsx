import React, { useState, useEffect } from "react";
import "./Navbar.css";
// Importar el logo
import logo from "../../assets/images/flow-logo.svg";

export const Navbar = () => {
	// Estado para almacenar la lista de problemas
	const [problems, setProblems] = useState([]);
	// Estado para el nuevo problema que se está escribiendo
	const [newProblem, setNewProblem] = useState("");

	// Cargar problemas del localStorage al iniciar
	useEffect(() => {
		const savedProblems = localStorage.getItem('problems');
		if (savedProblems) {
			setProblems(JSON.parse(savedProblems));
		}
	}, []);

	// Guardar problemas en localStorage cuando cambian
	useEffect(() => {
		localStorage.setItem('problems', JSON.stringify(problems));
	}, [problems]);

	// Manejar el envío del formulario
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
			setNewProblem(""); // Limpiar el input
		}
	};

	// Eliminar un problema
	const deleteProblem = (id) => {
		setProblems(problems.filter(problem => problem.id !== id));
	};

	return (
		<div className="navbar-container">
			{/* Barra superior con logo y usuario */}
			<div className="top-navbar">
				<div className="logo-container">
					{/* Reemplazar texto por imagen de logo */}
					<img src={logo} alt="Flow Logo" className="navbar-logo" />
				</div>

				<div className="navbar-controls">
					<button className="btn-report" data-bs-toggle="modal" data-bs-target="#problemasModal">
						<i className="bi bi-exclamation-triangle"></i>
						<span>Reportar</span>
					</button>

					<div className="user-dropdown">
						<button className="btn-user dropdown-toggle" data-bs-toggle="dropdown">
							<i className="bi bi-person-circle"></i>
							<span>Usuario</span>
						</button>
						<ul className="dropdown-menu dropdown-menu-end">
							<li><span className="dropdown-item user-name">Admin User</span></li>
							<li><hr className="dropdown-divider" /></li>
							<li><a className="dropdown-item" href="#">Mi perfil</a></li>
							<li><a className="dropdown-item" href="#">Configuración</a></li>
							<li><hr className="dropdown-divider" /></li>
							<li><a className="dropdown-item logout" href="#">Cerrar sesión</a></li>
						</ul>
					</div>
				</div>
			</div>

			{/* Barra de navegación secundaria */}
			<div className="sub-navbar">
				<div className="nav-sections">
					<button className="nav-item active">view 1</button>
					<button className="nav-item">view 2</button>
					<button className="nav-item">view 3</button>
					<button className="nav-item">view 4</button>
					<button className="nav-item">view 5</button>
				</div>

				<div className="search-container">
					<div className="search-input">
						<i className="bi bi-search"></i>
						<input type="text" placeholder="Buscar..." />
					</div>
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
	);
};