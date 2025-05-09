import { Link } from "react-router-dom";
import logoNavbar from "../assets/img/logo-navbar.png";
import logo from "../assets/img/logoBackground.svg";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<img
					src={logo}
					alt="Logo"
					width="80"
					height="80"
					className="d-inline-block align-top rounded-circle"
				/>
				<div className="ml-auto">
					<Link to="/signin">
						<button className="btn btn-primary">Sign In</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/signup">
						<button className="btn btn-primary">Sign up</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};