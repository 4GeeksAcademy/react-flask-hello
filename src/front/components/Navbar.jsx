import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">
						<img src='https://res.cloudinary.com/dmx0zjkej/image/upload/v1762540958/LOGO_200_x_200_muoehy.png' 
						className='logo'/>
					</span>
				</Link>
				<div className="ml-auto">
					<Link to="/register">
						<button className="btn btn-primary">Register</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};