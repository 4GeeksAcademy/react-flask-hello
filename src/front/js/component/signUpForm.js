import React, { useState } from 'react';
import '../../styles/authForms.css';


const SignUpForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send a POST request to the backend API
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Handle the response, e.g., redirect on successful signup
        if (response.ok) {
            // Redirect to login or another page
            window.location.href = '/login';
        } else {
            // Handle errors, e.g., display an error message
            console.error('Signup failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label className="label">First Name:</label>
                <input type="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" />
            </div>
            <div className="form-group">
                <label className="label">Last Name:</label>
                <input type="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" />
            </div>
            <div className="form-group">
                <label className="label">Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
            </div>
            <div className="form-group">
                <label className="label">Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
            </div>
            <button type="submit" className="submit-button">Submit</button>
        </form>
    );
};

export default SignUpForm;