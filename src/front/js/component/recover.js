import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import logo from "../../img/logo.jpeg";

export const PassRecovery = () => {
	const { actions } = useContext(Context);

	return (
		<div className="container">
			<div className="login-form">
				<form action="/examples/actions/confirmation.php" method="post">
					<h2 className="text-center">Recuperacion de contraseña</h2>
					<img src={logo} alt="logo" className="img-thumbnail mx-auto d-block rounded my-3" />
					<div className="form-group">
						<div className="input-group">
							<input
								type="email"
								className="form-control"
								name="email"
								placeholder="Correo electronico"
								required="required"
							/>
						</div>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-login login-btn btn-block">
							Recuperar Contraseña
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
