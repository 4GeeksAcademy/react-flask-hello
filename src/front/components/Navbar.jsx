import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to ="/google-api">
					   <button className="btn btn-primary">Google Api</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to ="/custom">
					   <button className="btn btn-primary">Custom ingredients</button>
					</Link>
				</div>
				
			</div>
		</nav>
	);
};