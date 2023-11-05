import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleInputEmail (event) {
        setEmail(event.target.value); // captura el email que escribe el usuario
    }

    function handleInputPassword (event) {
        setPassword(event.target.value); // captura la contraseña que escribe el usuario
    }

    async function handleSubmit(event) { // al presionar el botón login, si los datos están ok, redirecciona al home
        event.preventDefault()
        let logged = await actions.login(email, password);
        if (logged === true) {
            navigate("/")
        }
    }
    return (
        <div className="container">
            <h1 className="mt-5 text-center" id="login-title">Login</h1>
            <div className="d-flex justify-content-center" id="form_container">
                <form onSubmit={handleSubmit} id="login-form">
                    <div className="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input onChange={handleInputEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="example@componentify.com" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={handleInputPassword} type="password" class="form-control" id="exampleInputPassword1" />
                        <div id="emailHelp" class="form-text"><Link to={"/none"}>Forgot your password?</Link></div>
                    </div>
                    <button type="submit" class="btn btn-success" id="btn-login">Login</button>
                    <div id="emailHelp" class="form-text">Don't have an account yet? <Link to={"/signup"}>Sign Up.</Link></div>
                </form>
            </div>
        </div>

    )
}
 export default Login;