import React, { useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useNavigate, Link } from "react-router-dom";


import { FormularioLogin } from "../../components/FormularioLogin/FormularioLogin";
import "./Login.css";



export const Login = () => {

	const navigate = useNavigate()
	const { store, dispatch } = useGlobalReducer();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoadin] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoadin(true);

		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

			const response = await fetch(`${backendUrl}api/login`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					username,
					password
				})
			});

			const data = await response.json();

			console.log(data)

			if(!response.ok) {
				throw new Error(data.error || "Login failed");
			}

			dispatch({
				type:"login",
				payload: {
					token: data.acces_token,
					user: data.user
				}
			});

			navigate("/");

		} catch (err) {
			setError(err.message || "Login failed");
		}finally {
			setIsLoadin(false);
		}
	}





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