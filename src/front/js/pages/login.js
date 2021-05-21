/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login1 = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [auth, setAuth] = useState(false);

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({
		email: email,
		password: password
	});
	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow"
	};

	const handleLogin = e => {
		e.preventDefault();
		fetch("https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/login", requestOptions)
			.then(response => {
				if (!response.ok) {
					alert("Contraseña o Email es incorrecto");
					// throw Error(response.statusText);
				} else {
					setAuth(true);
					alert("Inicio sesión correcto");
				}
				return response.json();
			})
			.then(result => {
				sessionStorage.setItem("my_token", result.token);
				actions.logged();
				console.log("login es?", store, login);
			})
			.catch(error => console.log("error", error));
	};

	return (
		<div className="container">
			<div className="login" />
			<div className="backdrop" />
			<div className="d-flex justify-content-center h-100">
				<div className="card c1">
					<div className="card-header">
						<h3>Acceder</h3>
						<div className="d-flex justify-content-end social_icon">
							<span>
								<i
									className="fab fa-facebook-square"
									onClick={() => {
										alert("Funcionalidad en construcción");
									}}
								/>
							</span>
							<span>
								<i
									className="fab fa-google-plus-square"
									onClick={() => {
										alert("Funcionalidad en construcción");
									}}
								/>
							</span>
							<span>
								<i
									className="fab fa-twitter-square"
									onClick={() => {
										alert("Funcionalidad en construcción");
									}}
								/>
							</span>
						</div>
					</div>
					<div className="card-body">
						<form onSubmit={e => handleLogin(e)}>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fa fa-envelope" />
									</span>
								</div>
								<input
									type="text"
									className="form-control"
									placeholder="Email"
									onChange={e => {
										setEmail(e.target.value);
									}}
									required
								/>
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-key" />
									</span>
								</div>
								<input
									type="password"
									className="form-control"
									placeholder="Contraseña"
									onChange={e => setPassword(e.target.value)}
									required
								/>
							</div>
							<div className="row align-items-center remember">
								<input type="checkbox" />
								Recordar
							</div>
							<div className="form-group">
								<input type="submit" value="Ingresar" className="btn float-right login_btn" />
							</div>
						</form>
						{auth ? <Redirect to="/" /> : ""}
					</div>
					<div className="card-footer">
						<div className="d-flex justify-content-center links">
							No tienes cuenta?
							<Link to={"/register"} href="#">
								Adquirir
							</Link>
						</div>
						<div className="d-flex justify-content-center">
							<Link to={"/forgot"} href="#">
								Olvidaste la contraseña?
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
