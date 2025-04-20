import React from "react";
import { FormularioLogin } from "../../components/FormularioLogin/FormularioLogin";

import "./Login.css";
import logo from "../../assets/images/flow-logo.svg";



export const Login = () => {

	return (
		<div className="login-page">
			<div className="login-container">
				<div className="login-content">
					<div className="welcome-panel">
						<div className="welcome-content">
							<div className="welcome-icon">
								<img src={logo} alt="Flow Logo" />
							</div>
							<h2>Wellcome to FLOW</h2>
							<p>Professional business management system</p>
							<div className="welcome-features">
								<div className="feature-item">
									<i className="bi bi-calendar-check"></i>
									<span>Appointment management</span>
								</div>
								<div className="feature-item">
									<i className="bi bi-people"></i>
									<span>Personnel administration</span>
								</div>
								<div className="feature-item">
									<i className="bi bi-briefcase"></i>
									<span>Business management</span>
								</div>
							</div>
						</div>
					</div>
					<div className="login-form-container">
						<FormularioLogin />
					</div>
				</div>
			</div>
		</div>
	);
};