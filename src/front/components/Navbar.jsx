import { Link } from "react-router-dom";
import "./Styles/Navbar.css"


export const Navbar = () => {

	return (

		<nav>
			<div className="nav-content">

				<div className="buttons">
					<button className="Home">Home</button>
					<button className="Log">Login</button>
				</div>
				<div className="logo">
					<img url = '/workspaces/Spain_Coho_94_First_Proyect_Da_Da_Ja/src/front/assets/logo.png' /> 
				</div>
			</div>
		</nav>
	);
};