import { useNavigate } from "react-router-dom";
import "./Styles/Navbar.css"
import LogoFrame from "./Logo";



const Navbar = () => {

	const navigate = useNavigate();

	return (

		<nav>
			<div className="nav-content">

				<div className="logo">
					<LogoFrame />
				</div>
				
				<div className="nav_buttons">
					<button  onClick={() => navigate("/")}>Register</button>
					<button  onClick={() => navigate("/login")}>Login</button>
					<button  onClick={() => navigate("/home")}>Home</button>
					<button  onClick={() => navigate("/settings")}>Settings</button>
				</div>




			</div>
		</nav>
	);
};

export default Navbar;