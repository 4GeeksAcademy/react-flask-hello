import React from "react";
import "../../styles/login.css";

const Login = () => {

    return (
            <div class="container" id="container">
                <div class="form-container">
                    <form>
                        <h2>Crear Cuenta</h2>
                        <span>Usa tu email para registrarte</span>
                        <input type="email" placeholder="Correo" required />
                        <input type="password" placeholder="Contraseña" required />
                        <button>Registrarse</button>
                    </form>
                </div>
            </div>
    )
}

export default Login;