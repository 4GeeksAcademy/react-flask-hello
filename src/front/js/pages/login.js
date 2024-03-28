import React, { useContext, useState } from "react";
import "../../styles/login.css";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate(); // Obtener la función navigate
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [showPass, setShowPass] = useState(true);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            setFormError(true);
            setErrorMessage("Incorrect credentials");
            return;
        }

        setFormError(false);

        const loginResult = await actions.login(email, password);
        if (!loginResult.success) {
            setFormError(true);
            setErrorMessage(loginResult.error);
            return;
        }

        setLoggedIn(true);
    };

    // Redireccionar si el usuario está autenticado
    if (loggedIn) {
        navigate("/"); // Redireccionar al usuario al home
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                <h1>Login</h1>
                <p>
                    Don’t have an account? <Link to="/signup">Create now</Link>
                </p>
            </div>

            {formError && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                </label>
                <input
                    placeholder="email@email.com"
                    type="email"
                    className={`form-control ${formError && email === '' ? 'error' : ''}`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => setEmail(e.target.value)}
                />
                {formError && email === "" && (
                    <div className="error-message">Email is required</div>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                </label>
                <div className="input-group">
                    <input
                        placeholder="**********"
                        type={showPass ? "password" : "text"}
                        className={`form-control ${formError && password === '' ? 'error' : ''}`}
                        id="exampleInputPassword1"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div style={{ cursor: "pointer" }} onClick={() => setShowPass(!showPass)} className="input-group-text">
                        <i className="fa fa-eye"></i>
                    </div>
                </div>
                {formError && password === "" && (
                    <div className="error-message">Password is required</div>
                )}
            </div>

            <div className="mb-3 row form-check">
                <div className="col-auto">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        {" "}
                        Remember me
                    </label>

                    <Link className="form-check-label forgotPassword" to="/forgot">
                        Forgot Password?
                    </Link>
                </div>
            </div>

            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-success">
                    Login
                </button>
            </div>
        </form>
    );
};

export default Login;
