import React from "react";
import { Link } from "react-router-dom";
import logotipo from "../../img/PatasperdidasPNG.png"
export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
			<div className="container ">
				<img className="ms-5" width="50" height="50" src={logotipo} alt="logo" />

				<div className="collapse navbar-collapse d-flex justify-content-evenly" id="navbarNav">
					<ul className="navbar-nav ms-auto ">
						<li className="nav-item">
							<a className="adlam-display-regular nav-link me-4" href="#">
								Inicio
							</a>
						</li>
						<li className="nav-item">
							<a className="adlam-display-regular nav-link  me-4" href="#">
								Mapa
							</a>
						</li>
						<li className="nav-item">
							<a className="adlam-display-regular nav-link  me-4" href="#">
								¿Qué es?
							</a>
						</li>
						<li className="nav-item">
							<a className="adlam-display-regular nav-link  me-4" href="#">
								Contacto
							</a>
						</li>
						<li className="nav-item">
							<input className="form-control border-0  me-4" type="text" placeholder="🔎 Search" ></input>
						</li>
					</ul>
					<button className=" adlam-display-regular btn btn-primary ms-3 rounded-pill btnStart">Iniciar sesión</button>
				</div>
			</div>
		</nav>
	);
};
