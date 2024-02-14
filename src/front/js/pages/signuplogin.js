import React, { useContext } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { NavBar } from "../component/navbar";
import Image5 from "../../img/image5.jpg";

export const SignupLogin = () => {
	return (
		<div className="home">
			<NavBar />
			<div className="hero">
				<img className="hero__image" src={Image5} />
				<div className="container box">
					<div className="mt-5">
						<Link to="/signup">
							<button><strong>SIGN UP</strong></button>
						</Link>
						<Link to="/login">
							<button><strong>LOGIN</strong></button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};