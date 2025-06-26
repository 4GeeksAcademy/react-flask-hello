import { Link } from "react-router-dom";
import { navLinks } from "../utils/navLinks";
import LogoNavbar from "../assets/img/LogoNavbar.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export const Navbar = () => {

	return (
		<nav className="container mt-3">
      		<div className="navbar navbar-expand-md bg-white rounded shadow-sm px-4 py-2">
				<Link className="navbar-brand" href="#" to="/">
					<img src={LogoNavbar} alt="Cloudtech" className="Cloudtech-navbar-logo"/>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="hiddencanvas"
					data-bs-target="#hiddencanvasNavbar"
					aria-controls="hiddencanvasNavbar"
					>	
					<span className="navbar-toggler-icon"></span>
				</button>

			<div className="collapse navbar-collaps justify-content-end" id="hiddencanvasNavbar">
				<ul className="navbar-nav align-items-center gap-2">
					<li className="nav-item">
						<Link className="nav-link custom-hover" to="/">Inicio</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link custom-hover" to="/nosotros">Nosotros</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link custom-hover" to="/">Servcios</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link custom-hover" to="/" >Inicio</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link custom-hover" to="/" >Inicio</Link>
					</li>
				</ul>
			</div>
			</div>
		</nav>
	);
};