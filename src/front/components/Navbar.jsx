import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<header>
			<nav
				className="px-4 py-3"
				style={{
					backgroundColor: "#FF2E63",
					backdropFilter: "blur(6px)",
				}}
			>
				<div className="container">
					<div className="row align-items-center">
						{/* Columna para el nombre del sitio */}
						<div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
							<Link to="/" className="navbar-brand text-black h3 mb-0">
								<h2>ASAD-APP</h2>
							</Link>
						</div>
 
						{/* Columna para los botones */}
						<div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end gap-2">
							<Link to="/about">
								<button className="btn btn-outline-black">About Us</button>
							</Link>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};
