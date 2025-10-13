import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<div>

			<nav className="navbar navbar-expand-lg back-color-5 " >
				<div className="container">
					<Link to="/" className="text-decoration-none">
						<p className="font-color-1 fw-semibold fs-4" href="/">Tartara</p>
					</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<i className="fa-solid fa-bars font-color-1 fs-2" ></i>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav ms-auto">
							<li className="nav-item d-flex align-items-center font-color-3 ">
								<Link className="nav-link  py-0 text-center fw-semibold font-color-3" to="/auth/todo-panel"
								>Missions</Link> |
							</li>
							<li className="nav-item d-flex align-items-center font-color-3 ">
								<Link className="nav-link fw-semibold font-color-3" to="/about-us"
								>About us</Link> 
							</li>
							<li className="nav-item">
								<Link to="/auth" state={{ type: "login" }}>
									<button type="button" className="btn back-color-2 button-color-1 font-color-3 fw-semibold">Log in</button>
								</Link>
							</li>

						</ul>
					</div>
				</div>
			</nav>
			<div className="navbar-filled back-color-4">
			</div>
		</div>
	);
};