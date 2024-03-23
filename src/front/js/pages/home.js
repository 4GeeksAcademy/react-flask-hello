import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import Signup from "../component/signup"

export const Home = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isMember, setIsMember] = useState(true); // Add state to toggle between login and signup view
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const result = await actions.login({ email, password });
            if (result) {
                navigate("/private"); // Navigate to profile if login is successful
            }
        } catch (error) {
            setLoginError("Failed to log in: " + error.message);
        }
    };

   

    return (
        <div className="w-50 mx-auto">
            <img src="#" className="mx-auto" height="300px" width="300px" />
            {isMember ? (
                <div className="text-left">
                <h3>Sign In</h3>
                <p>Hi there! Nice to see you again.</p>
                <p>Email</p>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <p>Password</p>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                {loginError && <p className="text-danger">{loginError}</p>}
                <button onClick={handleLogin} className="btn btn-success">Sign In</button>
                <p>Not a member yet? <span className="text-primary" style={{cursor: 'pointer'}} onClick={() => setIsMember(false)}>Sign up</span></p>
                <button onClick={() => navigate("/profile")}>Test Navigate</button>

            </div>
            ) : (
               <Signup />
            )}
        </div>
    );
};

