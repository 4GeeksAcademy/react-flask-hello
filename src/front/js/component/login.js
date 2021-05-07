import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import logo from "../../img/logo.jpeg";

export const Login = () => {
	const { actions } = useContext(Context);

	return (
		<div className="container">
			<div className="login-form">
				<form action="/examples/actions/confirmation.php" method="post">
					<h2 className="text-center">Ingresar</h2>
					<img src={logo} alt="logo" className="img-thumbnail mx-auto d-block rounded my-3" />
					<div className="form-group">
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								name="username"
								placeholder="Usuario"
								required="required"
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="input-group">
							<input
								type="password"
								className="form-control"
								name="password"
								placeholder="Contraseña"
								required="required"
							/>
						</div>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-login login-btn btn-block">
							Ingresar
						</button>
					</div>
					<div className="clearfix">
						<label className="float-left checkbox-inline">
							<input type="checkbox" /> Recordarme.
						</label>
						<Link to="/recoverLogIn" className="float-right">
							<a>Olvidaste la Contraseña?</a>
						</Link>
					</div>
					<div className="or-seperator">
						<i>o</i>
					</div>
					<p className="text-center">Ingresar con red sociales</p>

					<div className="text-center social-btn">
						<FacebookLogin
							appId="1167779733658455"
							callback={actions.responseFacebook}
							render={renderProps => (
								<button className="social-btn btn-primary" onClick={renderProps.onClick}>
									<i className="fab fa-facebook-f" /> Facebook
								</button>
							)}
						/>{" "}
						<GoogleLogin
							clientId="253456588353-u3j0pe2o5mhoj8s93og3o2tt0qfhai7k.apps.googleusercontent.com"
							render={renderProps => (
								<button
									className="social-btn btn-danger"
									onClick={renderProps.onClick}
									//disabled={renderProps.disabled}
								>
									<i className="fab fa-google" /> Google
								</button>
							)}
							buttonText="Login"
							onSuccess={actions.responseGoogle}
							onFailure={actions.responseGoogle}
							cookiePolicy={"single_host_origin"}
						/>
					</div>
				</form>
				<p className="text-center text-muted small">
					No tienes una cuenta?{" "}
					<Link to="/registerUserIn">
						<a>Registrarse aqui!</a>
					</Link>
				</p>
			</div>
		</div>
	);
};
