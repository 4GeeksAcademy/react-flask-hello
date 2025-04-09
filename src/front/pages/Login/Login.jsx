import React from "react";
import { FormularioLogin } from "../../components/FormularioLogin/FormularioLogin";
import "./Login.css";

export const Login = () => {
	return (
		<div className="login-page">
			{/* Contenido principal */}
			<div className="login-container">
				<div className="login-content">
					{/* Panel de bienvenida */}
					<div className="welcome-panel">
						<div className="welcome-content">
							<div className="welcome-icon">
								<i className="bi bi-shield-lock"></i>
							</div>
							<h2>Bienvenido a Flow</h2>
							<p>Sistema de gestión empresarial profesional</p>
							<div className="welcome-features">
								<div className="feature-item">
									<i className="bi bi-calendar-check"></i>
									<span>Gestión de citas</span>
								</div>
								<div className="feature-item">
									<i className="bi bi-people"></i>
									<span>Administración de personal</span>
								</div>
								<div className="feature-item">
									<i className="bi bi-briefcase"></i>
									<span>Gestión de negocios</span>
								</div>
							</div>
						</div>
					</div>

					{/* Formulario de inicio de sesión */}
					<div className="login-form-container">
						<FormularioLogin />
					</div>
				</div>
			</div>
		</div>
	);
};