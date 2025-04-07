import React, { useState } from "react";
import "./FormularioLogin.css";

export const FormularioLogin = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: ""
	});

	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData({
			...formData,
			[id]: value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Aquí iría la lógica de autenticación
		console.log("Datos de inicio de sesión:", formData);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="form-login-container">
			<div className="form-header">
				<h2>Iniciar sesión</h2>
				<p>Ingresa tus credenciales para acceder al sistema</p>
			</div>

			<form className="login-form" onSubmit={handleSubmit}>
				{/* Campo de usuario */}
				<div className="form-group">
					<label htmlFor="username" className="form-label">Usuario</label>
					<div className="input-group">
						<span className="input-icon">
							<i className="bi bi-person"></i>
						</span>
						<input
							type="text"
							id="username"
							className="form-control"
							placeholder="Ingresa tu nombre de usuario"
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				{/* Campo de contraseña */}
				<div className="form-group">
					<div className="password-label-row">
						<label htmlFor="password" className="form-label">Contraseña</label>
						<a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
					</div>
					<div className="input-group">
						<span className="input-icon">
							<i className="bi bi-lock"></i>
						</span>
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							className="form-control"
							placeholder="Ingresa tu contraseña"
							value={formData.password}
							onChange={handleChange}
							required
						/>
						<button
							type="button"
							className="password-toggle"
							onClick={togglePasswordVisibility}
						>
							<i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
						</button>
					</div>
				</div>

				{/* Recordar credenciales */}
				<div className="form-check">
					<input type="checkbox" className="form-check-input" id="rememberMe" />
					<label className="form-check-label" htmlFor="rememberMe">
						Recordar mis credenciales
					</label>
				</div>

				{/* Botón de inicio de sesión */}
				<button type="submit" className="login-button">
					<i className="bi bi-box-arrow-in-right"></i>
					Iniciar sesión
				</button>
			</form>

			<div className="login-footer-text">
				<p>¿No tienes una cuenta? <a href="#">Comunícate con el administrador</a></p>
			</div>
		</div>
	);
};