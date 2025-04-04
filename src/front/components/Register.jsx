import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Styles/Register.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [checked, setChecked] = useState(false); 
    
const navigate = useNavigate();

const handleRegister = async (e) => {
    e.preventDefault()

    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, username }),
        });

        const data = await response.json();
        alert(data.message);

        
        if (response.ok) {
            navigate("/Settings"); 

        } else {
            throw new Error(data.message || "Error en el inicio de sesión");
        }
    } catch (error) {
        console.error("Error en el login:", error);
        alert("Hubo un problema con el inicio de sesión.");
    }
};

    return (
        <div className="register">
            
            <form onSubmit={handleRegister} className="form-content">

                <div className = "label-content">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email" 
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}  
                        onChange={(e) => setEmail(e.target.value)}
                        aria-describedby="emailHelp"
                    />
                </div>

                <div className= "label-content">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className= "label-content">
                    <label htmlFor="UserName" className="form-label">
                        Username
                    </label>
                    <input
                        type="username"
                        className="form-control"
                        id="username"
                        name="username"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="check"
                        name="checked"
                        checked={checked} 
                        onChange={(e) => setChecked(e.target.checked)} 
                    />
                    <label className="form-check-label" htmlFor="check">
                        Check me out
                    </label>
                </div>

                <button type="submit">Registrarse</button>
               
            </form>
        </div>
    );
}

export default Register;
