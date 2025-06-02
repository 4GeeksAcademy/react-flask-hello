import React from "react";
import "../../styles/login.css";

const Login = () => {

    return (
            <div class="container" id="container">
                <div class="form-container">
                    <form>
                        <h2>Iniciar sesion</h2>
                        <span>Usa tu email para iniciar sesion</span>
                        <input type="email" placeholder="Correo" required />
                        <input type="password" placeholder="Contraseña" required />
                        <button className="button_login">Login</button>
                    </form>
                </div>
            </div>
    )
}

export default Login;