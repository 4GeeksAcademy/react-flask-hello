import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [activity, setActivity] = useState("");

   
    const [preference, setPreference] = useState('');
    const [rememberPreference, setRememberPreference] = useState(false);

    const [error, setError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isMember, setIsMember] = useState(true); // Add state to toggle between login and signup view

    const handleSignup = async () => {
        try {
            await actions.signUp({ email, password, age, height, weight, activity });
            setIsMember(true); // Switch to login view after successful signup
            setLoginError(""); // Clear any existing errors
            navigate("/profile")
        } catch (error) {
            setLoginError("Failed to sign up: " + error.message);
        }
    };
    
    return (
        <div>
            <div className="text-left">
                    <h3>Join Us</h3>
                    <p>Welcome! Join us by signing up below.</p>
                    <p>Email</p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <p>Password</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <p>Age</p>
                    <input type="age" onChange={(e) => setAge(e.target.value)} value={age} />
                    <p>Height</p>
                    <input type="height" onChange={(e) => setHeight(e.target.value)} value={height} />
                    <p>Weight</p>
                    <input type="weight" onChange={(e) => setWeight(e.target.value)} value={weight} />
                    <label for="cars"> Activity Level:</label>
                    <select name="cars" id="cars">
                    <option value="volvo">Very Active</option>
                    <option value="saab">Less</option>
                    <option value="mercedes">None</option>
                    <option value="audi">Disabled</option>
                    </select>
                    {loginError && <p className="text-danger">{loginError}</p>}
                    <button onClick={handleSignup} className="btn btn-secondary">Sign up</button>
                    <p>Already a member? <span className="text-primary" style={{cursor: 'pointer'}} onClick={() => setIsMember(true)}>Log in</span></p>
                </div>
        </div>
    );
};