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
					<button className="nav-btn"  onClick={() => navigate("/")}>Register</button>
					<button className="nav-btn"  onClick={() => navigate("/login")}>Login</button>
					<button className="nav-btn"  onClick={() => navigate("/home")}>Home</button>
					<button className="nav-btn"  onClick={() => navigate("/settings")}>Settings</button>
					<button className="nav-btn"  onClick={() => navigate("/cart")}>Cart</button>

				</div>




			</div>
		</nav>
	);
};

export default Navbar;