import { Link } from "react-router-dom";

import "./Styles/Navbar.css"
import LogoFrame from "./Logo";






const Navbar = () => {

	return (

feature/login
		<nav>
			<div className="nav-content">

				<div className="buttons">
					<button className="Home">Home</button>
					<button className="Log">Login</button>
				</div>

				<div className="logo">
				<LogoFrame/>
				</div>

	);
};

export default Navbar;