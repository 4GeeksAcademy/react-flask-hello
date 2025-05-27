import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<header
			className="d-flex flex-column justify-content-between min-vh-50 min-vh-lg-60"
			style={{
				backgroundImage:
					'url("https://images.rawpixel.com/image_social_landscape/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvay0yMDItdG9uZy0wMDYxLmpwZw.jpg?s=Cq7tgpYFe3F0fHIsPvzbCuf4bD2giLSXJaVrGJECz7U")',
				backgroundSize: "cover",
				backgroundPosition: "center",
				color: "white",
				textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
			}}
		>
			<nav
				className="px-4 py-3"
				style={{
					backgroundColor: "rgba(255, 0, 128, 0.6)",
					backdropFilter: "blur(6px)",
				}}
			>
				<div className="container">
					<div className="row align-items-center">
						{/* Columna para el nombre del sitio */}
						<div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
							<Link to="/" className="navbar-brand text-black h3 mb-0">
								<h3>ASAD-APP</h3>
							</Link>
						</div>
 
						{/* Columna para los botones */}
						<div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end gap-2">
							<Link to="/about">
								<button className="btn btn-outline-dark px-3">About Us</button>
							</Link>
							<Link to="/login">
								<button className="btn btn-dark px-3">Inicio de sesión</button>
							</Link>
						</div>
					</div>
				</div>
			</nav>

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
					<strong>Tu mejor compañero para realizar los mejores eventos</strong>
				</p>
				<Link to="/register">
					<button className="btn btn-dark mt-3">REGISTRARSE</button>
				</Link>
			</div>
		</header>
	);
};
