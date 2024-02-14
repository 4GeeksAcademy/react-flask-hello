import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

export const NavBar = () => {
	return (
			<nav className="nav">
				<div className="container nav__menu">
					<a href="/">
						<img src={logo} className="nav__logo"/>
					</a>
					<Link to="/signuplogin" className="nav__btn round">
						<span>CLEANERS</span>
					</Link>
				</div>
			</nav>
		);
	};
