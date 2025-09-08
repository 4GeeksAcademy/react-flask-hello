import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">
						WhiteGlove <span className="text-primary">BnB</span>
					</span>
				</Link>

				<div className="ml-auto">
					<Link to="/login" style={{ marginRight: 8 }}>
						<button className="btn btn-outline-secondary">Log in</button>
					</Link>
					<Link to="/signup">
						<button className="btn btn-primary">Get Started</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
