import React from "react";
import { Link, useLocation } from "react-router-dom";
// import { Login } from "../pages/login";

export const Navbar = () => {

	let location = useLocation();
	console.log(location.pathname)
	
	return (
		//<nav className="navbar p-0">
		<>
		{location.pathname !== "/" && 
		(<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Ocean Of Om</span>
					<p>Yoga Hub</p>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
						<ul className="nav">
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="#">Home</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Suscriptions</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Contact Us</a>
							</li>
						</ul>
					</Link>
				</div>
			</div>
		</nav>
		)
	  }
	  </>
	);
};
