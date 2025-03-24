import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css"; 

export const Signup = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {

            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

            const response = await fetch(`${backendUrl}/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    firstname,
                    lastname,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            console.log(data)
            if (!response.ok) {
                throw new Error(data.error || "Error registering");
            }

            navigate("/login");

        } catch (err) {
            setError(err.message || "Error registering");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Create Account</h2>

                {error && <div className="signup-error">{error}</div>}

                <form onSubmit={handleSubmit} className="signup-form">

                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} required 
                    />

                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Firstname" 
                        value={firstname} 
                        onChange={(e) => setFirstname(e.target.value)} required 
                    />

                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Lastname" 
                        value={lastname} 
                        onChange={(e) => setLastname(e.target.value)} required 
                    />

                    <input 
                        type="email" 
                        className="input-field" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} required 
                    />

                    <input 
                        type="password" 
                        className="input-field" 
                        placeholder="Password" v
                        alue={password} 
                        onChange={(e) => setPassword(e.target.value)} required 
                    />

                    <input 
                        type="password" 
                        className="input-field" 
                        placeholder="Confirm Password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} required 
                    />

                    <button type="submit" className="signup-button" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </form>

                <div className="signup-footer">
                    <p>Already have an account? <Link to="/login" className="signup-link">Log In</Link></p>
                </div>
            </div>
        </div>
    );
};