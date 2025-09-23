import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Landing.css";
import "./LoginSignup.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('https://upgraded-system-7vgj4vjj6j52rx7j-3000.app.github.dev/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok && data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        navigate('/dashboard');
      } else {
        setError(data.msg || 'Failed to login');
      }
    } catch (error) {
      setError(error.message || 'Failed to login');
      console.error('Failed to login:', error);
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-title">Account Login</h1>
      <div className="login-box">
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="login-input"
          />
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="login-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
