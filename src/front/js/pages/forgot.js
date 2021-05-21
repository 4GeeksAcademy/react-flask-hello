import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Forgot1 = () => {
	const [email, setEmail] = useState("");

	const getEmail = event => {
		setEmail(event.target.value);
	};

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({
		email: email
	});
	var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow"
	};

	const recuperarContraseña = () => {
		fetch("https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/forgot-password", requestOptions)
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
						<h3>Recuperación de contraseña</h3>
					</div>
					<div className="card-body">
						<form onSubmit={recuperarContraseña()}>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="	fa fa-envelope" />
									</span>
								</div>
								<input
									type="text"
									className="form-control"
									placeholder="Ingrese su Email"
									onChange={getEmail}
									required
								/>
							</div>
							<div className="card-footer">
								<div className="d-flex justify-content-center links">
									Recordaste la contraseña?
									<Link to={"/login"} href="#">
										Ingresar
									</Link>
								</div>
							</div>
							<div className="form-group">
								<Link to={"/login"} href="#">
									<input type="Submit" value="Enviar" className="btn float-right login_btn" />
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
