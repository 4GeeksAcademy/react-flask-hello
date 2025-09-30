import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Landing.css";
import "./LoginSignup.css";

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await fetch('https://upgraded-system-7vgj4vjj6j52rx7j-3001.app.github.dev/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Signup failed');
      }
      setSuccess(data.msg || 'Signup successful!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setError(error.message || 'Failed to signup');
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Create Account</h1>
      <div className="signup-box">
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="signup-input"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="signup-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="signup-input"
          />
          {error && <div className="signup-error">{error}</div>}
          {success && <div className="signup-success">{success}</div>}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>

        <p className="signup-footer">
          <a href="/login">Already have an account?</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
