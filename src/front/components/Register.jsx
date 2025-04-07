import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Styles/Register.css";

function Register() {
    const [email, setEmail] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [checked, setChecked] = useState(false); 
    
const navigate = useNavigate();

const handleRegister = async (e) => {
    e.preventDefault()

    try {
        const backendURL = import.meta.env.VITE_BACKEND_URL || "";

        const response = await fetch(`${backendURL}api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                first_name:first_name, 
                last_name:last_name, 
                email:email, 
                password:password, 
                username:username,
                checked:checked
             }),
        });

        const data = await response.json();
        alert(data.message);

        
        if (!response.ok) {
            throw new Error(data.message || "Error en el inicio de sesión"); 
        } 

        dispatch({
            type: "settings",
            payload: {
                email: email,
                token: data.access_token,
                username: data.user.username
            }
        })

        navigate("/settings");
            
        
    } catch (error) {
        console.error("Error en el login:", error);
        alert("Hubo un problema con el inicio de sesión.");
    }
};

    return (
        <div className="register">
            
            <form onSubmit={handleRegister} className="form-content">
                {/* First Name */}
                <div className= "label-content">
                    <label htmlFor="FirstName" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        name="first_name"
                        value={first_name} 
                        onChange={(e) => setFirst_name(e.target.value)}
                    />
                </div>

                {/* Last Name */}
                <div className= "label-content">
                    <label htmlFor="Last Name" className="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        name="last_name"
                        value={last_name} 
                        onChange={(e) => setLast_name(e.target.value)}
                    />
                </div>

                {/* Email */}
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
