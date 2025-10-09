import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-expand-lg back-color-5  " >
			<div className="container">
				<a className="navbar-brand font-color-1" href="#">Tartara</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item ">
							<a className="nav-link border-end border-black p-0 text-center" aria-current="page" href="#">Todo's</a>
						</li>
					
						<li className="nav-item">
							<a className="nav-link" href="#">About us</a>
						</li>
					
					</ul>
				</div>
			</div>
		</nav>
	);
};