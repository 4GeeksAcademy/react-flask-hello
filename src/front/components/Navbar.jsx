import { Link } from "react-router-dom";

export const Navbar = () => {

	return (

		<nav className="navbar navbar-expand-lg navbar ">
			<div className="container">
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="w-50 navbar-brand d-flex align-items-center ">
					<Link to="/" className="d-flex align-items-center text-decoration-none">
						<img className="my-2 icon" src="src/front/assets/img/MM-1.png" alt="" />
					</Link>
					<p className="icon-text mb-0 text-white">MentorMatch</p>
				</div>
				<div className="collapse navbar-collapse" id="navbarTogglerDemo03">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
						<li className="nav-item">
							<a className="nav-link active text-white navbar-text fs-5" aria-current="page" href="#">Mentores</a>
						</li>
						<li className="nav-item ">
							<a className="nav-link text-white navbar-text fs-5" href="#">Temas</a>
						</li>
					</ul>
					<div>
						<button type="button" class="btn btn-primary me-2 rounded-pill navbar-btn ">Login</button>
						<button type="button" class="btn btn-primary rounded-pill navbar-btn">Registro</button>
					</div>

				</div>
			</div>
		</nav>



	);
};