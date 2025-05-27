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
<<<<<<< HEAD
								<button className="btn btn-outline-black">About Us</button>
=======
								<button className="btn btn-outline-dark px-3">About Us</button>
>>>>>>> 43641c9f75967f93afc7c82f44b3da521168ef7e
							</Link>
						</div>
					</div>
				</div>
			</nav>
<<<<<<< HEAD

			<div className="container text-center mb-5 px-3 mt-5">
				<h1 style={{
						fontSize: "clamp(2rem, 6vw, 4rem)",
						fontWeight: "bold",
						color: "#FF2E63",
					}}
				>
					ASAD-APP
				</h1>
				<p style={{fontSize: "clamp(1rem, 2.5vw, 1.5rem)", color: "black",}}>
					<h2><strong>Tu mejor compañero para realizar los mejores eventos</strong></h2>
				</p>
			</div>
=======
>>>>>>> 43641c9f75967f93afc7c82f44b3da521168ef7e
		</header>
	);
};
