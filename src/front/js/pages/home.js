import React, { useContext } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {


	return (
		<div className="text-center mt-5">
			<h1>Home Page</h1>
			<Link to="/signup">
					<button className="btn btn-primary">Signup</button>
			</Link>
			<Link to="/login">
					<button className="btn btn-primary">Login</button>
			</Link>
		</div>
	);
};