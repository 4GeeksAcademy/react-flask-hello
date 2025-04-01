import { Link } from "react-router-dom";
import "./Styles/Navbar.css"
import LogoFrame from "./Logo";


const Navbar = () => {

	return (

		<nav>
			<div className="nav-content">

				<div className="buttons">
					<button className="Home">Home</button>
					<button className="Log">Login</button>
				</div>

				<div className="logo">
				<LogoFrame/>
				</div>
				
			</div>
		</nav>
	);
};

export default Navbar;