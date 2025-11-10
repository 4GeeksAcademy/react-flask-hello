import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ImageAvatar from "./ImageAvatar";

export const Navbar = () => {
	const { store } = useGlobalReducer();

	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container">
				
				<Link to="/" className="navbar-brand d-flex align-items-center text-decoration-none">
					<img
						className="my-2 icon"
						src={store.icon}
						alt="icon"
						style={{ height: "40px", width: "auto" }}
					/>
					<p className="icon-text mb-0 text-white ms-2">{store.nameApp}</p>
				</Link>

				
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarContent"
					aria-controls="navbarContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				
				<div className="collapse navbar-collapse justify-content-end" id="navbarContent">
					<ul className="navbar-nav align-items-lg-center">
						
						{!store.auth && (
							<>
								<li className="nav-item me-lg-2">
									<Link to="/login" className="nav-link">
										<button type="button" className="btn btn-primary rounded-pill navbar-btn w-100">
											Login
										</button>
									</Link>
								</li>
								<li className="nav-item">
									<Link to="/register" className="nav-link">
										<button type="button" className="btn btn-primary rounded-pill navbar-btn w-100">
											Registro
										</button>
									</Link>
								</li>
							</>
						)}

						
						{store.auth && (
							<li className="nav-item">
								<Link className="nav-link d-flex align-items-center" to={`/dashboard/${store?.user.role}`}>
									<ImageAvatar />
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};
