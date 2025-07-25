import { Link } from "react-router-dom";
import { Login } from "./Login.jsx";


export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-red-300">
			<div className="container">
				<Link to="/">
				</Link>
				<div className="float-right">
					<Login/>
				</div>
				<div className="ml-auto">
					<Link to="/demo">
					</Link>
				</div>
			</div>
		</nav>
	);
};