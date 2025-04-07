import { useNavigate } from "react-router-dom";
import "./Styles/Navbar.css"
import LogoFrame from "./Logo";
import useGlobalReducer from "../hooks/useGlobalReducer"


const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();
	const token = localStorage.getItem("token") || null

	const handleLogout = () => {
		dispatch({
			type:"logout"
		})
	}

	const navigate = useNavigate();

	return (

		<nav>
			<div className="nav-content">

				<div className="logo">
					<LogoFrame />
				</div>
				
				<div className="nav_buttons">
					<button onClick={() => navigate("/")}>Home</button>
					<button onClick={()=> navigate("/signup")}>Signup</button>
					<button onClick={() => navigate("/settings")}>Settings</button>
					{token &&  
						<button 
							type="button" 
							className ="btn btn-danger"
							onClick={handleLogout}
						>
						Logout
						</button>
						
					}
				</div>



			</div>
		</nav>
	);
};

export default Navbar;