import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

import logo from "../assets/img/logo.png";



export const Home = () => {
	return (
		<div
			className="container d-flex flex-column align-items-center justify-content-center"
			style={{ minHeight: "100vh" }}
		>
			{/* Logo */}
			<div
				className="p-4 mb-3 d-flex align-items-center justify-content-center"
				style={{
					backgroundColor: "#e0e0e0",
					width: "100%",
					maxWidth: "400px",
					height: "200px",
					borderRadius: "8px",
				}}
			>
				<div className="logo text-center mb-4">
					<img
						src={logo}    // ← this file must live in public/
						alt="My App Logo"
						style={{  }}
					/>
				</div>

			</div>
			<div className="ml-auto">
				<Link to="/custom">
					<button className="btn btn-primary">Custom ingredients</button>
				</Link>
			</div>


			{/* Sign Up */}
			<div
				className="p-4 mb-3"
				style={{
					backgroundColor: "#e0e0e0",
					width: "100%",
					maxWidth: "400px",
					borderRadius: "8px",
				}}
			>
				<button className="btn btn-secondary d-block mx-auto">Sign Up</button>
			</div>

			{/* Sign In */}
			<div
				className="p-4 mb-3"
				style={{
					backgroundColor: "#e0e0e0",
					width: "100%",
					maxWidth: "400px",
					borderRadius: "8px",
				}}
			>
				<button className="btn btn-secondary d-block mx-auto">Sign In</button>
			</div>

			{/* Password Recovery */}
			<div
				className="p-4 mb-3"
				style={{
					backgroundColor: "#e0e0e0",
					width: "100%",
					maxWidth: "400px",
					borderRadius: "8px",
				}}
			>
				<button className="btn btn-secondary d-block mx-auto">
					Password Recovery
				</button>
			</div>
		</div>
	);
};
