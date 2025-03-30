import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './Styles/Navbar.css'

const Navbar = () => {

	return (


		<nav>
			<div className="links">
				<NavLink to="/" activeClassName="active">Home</NavLink>
				<NavLink to="/about" activeClassName="active">About</NavLink>
				<NavLink to="/contact" activeClassName="active">Contact</NavLink>
			</div>
		</nav>

			

	);
};

export default Navbar;