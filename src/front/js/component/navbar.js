import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../img/logoOCEANOM.png" 
// import { Login } from "../pages/login";

export const Navbar = () => {

	let location = useLocation();
	console.log(location.pathname)
	
	return (
		//<nav className="navbar p-0">
		<>
            {location.pathname !== "/" && (
                <nav
                    id="navbar"
                    className="navbar navbar-expand-lg navbar-dark fixed-top"
                    style={{ backgroundColor: "#1D77AB" }}>
                    <div className="container mt-1 ms-2 col-lg-12 col-md-6 col-sm-6">
                        <Link to="/">
                            <img src={logo} className="card-img-top" alt="..." style={{ width: "50%" }} />
                        </Link>
                        <div className="ml-auto me-0">
                            <ul className="nav col-lg-12 col-md-12 col-sm-12 d-flex flex-md-row flex-column align-items-start">
                                <li className="nav-item">
                                    <Link to="/contactus">
                                        <span className="nav-link active text-light" aria-current="page">
                                            Contact Us
                                        </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
									<Link to="/theteachers">
                                    <span className="nav-link text-light">The Teachers</span>
									</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/">
                                    <span className="nav-link text-light">Log In</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )}
        </>
	);
};
