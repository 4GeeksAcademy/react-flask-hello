import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Styles/Register.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        alert(data.message);


        {/hacer un  try catch y justo encima del catch, el ultimo paso del try seria un navigate a la pagina que quiera/}
    
    };

    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
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

                <div className="mb-3">
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

                <div className="mb-3 form-check">
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
                <button type="button" onClick={() => navigate("/settings")}>Settings</button>
            </form>
        </div>
    );
}

export default Login;