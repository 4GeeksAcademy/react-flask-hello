import React from "react";
import "../../styles/register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {

     const navigate = useNavigate();
    
        const handleSubmit = (e) => {
            e.preventDefault();
            navigate("/login");
        };

    return (
        <div className="container_register">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2 className="mt-5">Register</h2>
                    <input type="fullName" placeholder="Full Name" required />
                    <input type="userName" placeholder="User Name" required />
                    <input type="email" placeholder="Correo" required />
                    <input type="password" placeholder="Password" required />
                    <input type="password" placeholder="Confirm Password" required />
                    <button className="button_login">Submit</button>
                </form>
                <div className="options-row">
                    <label className="remember-label">
                        <input type="checkbox" className="me-4"/>
                        Recuérdame
                    </label>
                </div>
                <div className="form-footer">
                    <div className="options-row1">
                        <label className="remember-label">
                            <input type="checkbox" className="checkbox1 me-4" />
                            Soy mayor de 16 años y acepto los &nbsp;<a href="#">Términos y condiciones</a>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
} 
 
export default Register;