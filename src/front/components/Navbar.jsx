import { Link } from "react-router-dom";
import { Login } from "./Login.jsx";


export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
				</Link>
				<Login/>
				<div className="ml-auto">
					<Link to="/demo">
					</Link>
				</div>
			</div>
		</nav>
	);
};