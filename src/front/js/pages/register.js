/* eslint-disable no-console */
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Register1 = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [location, setLocation] = useState("");
	const [password, setPassword] = useState("");

	const getName = event => {
		setName(event.target.value);
	};
	const getEmail = event => {
		setEmail(event.target.value);
	};
	const getLocation = event => {
		setLocation(event.target.value);
	};
	const getPassword = event => {
		setPassword(event.target.value);
	};

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({
		name: name,
		email: email,
		password: password,
		location: location
	});
	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow"
	};

	const registrarUsuario = () => {
		fetch("https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/register", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	};

	return (
		<div className="container">
			<div className="login" />
			<div className="backdrop" />
			<div className="d-flex justify-content-center h-100">
				<div className="card c1">
					<div className="d-flex justify-content-center text-white">
						<h3>Registrarme</h3>
					</div>
					<div className="card-body">
						<form onSubmit={registrarUsuario}>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-user" />
									</span>
								</div>
								<input
									type="text"
									className="form-control"
									placeholder="Nombre"
									required
									onChange={getName}
								/>
							</div>
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
									required
									onChange={getEmail}
								/>
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-map-marker-alt" />
									</span>
								</div>
								<input
									type="text"
									className="form-control"
									placeholder="Ubicación"
									required
									onChange={getLocation}
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
									required
									onChange={getPassword}
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
									placeholder="Confirme su contraseña"
									required
								/>
							</div>
							<div className="form-group">
								<Link to={"/login"} href="#">
									<input
										type="submit"
										value="Registrar"
										className="btn float-right login_btn"
										onClick={() => {
											alert("Registro completo!!!");
										}}
									/>
								</Link>
							</div>
							<div className="card-footer">
								<div className="d-flex justify-content-center links">
									Ya tienes cuenta?
									<Link to={"/login"} href="#">
										Ingresar
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
