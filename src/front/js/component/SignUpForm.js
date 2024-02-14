import React, { useState } from "react";
import { Link } from "react-router-dom";

import SignupHeroImage from "../../img/pitch/overlay/signup-hero-overlay.png";


export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setLoading(true);

    try {
      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const response = await fetch(`${process.env.BACKEND_URL}/api/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // If signup is successful and a token is received
      if (response.ok && data.token) {
        // Store the token in localStorage or another form of persistent storage
        localStorage.setItem('token', data.token);
        console.log('Signup successful, token received:', data.token);
      } else {
        setError(data.message || 'Signup failed');
        console.log('Signup failed:', data.message);
      }

      console.log(data);
    } catch (error) {
      setError('An error occurred during signup');
      console.log("There is an error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-full py-5 h-100" style={{ backgroundImage: `url(${SignupHeroImage})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
      <div className="signup row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card signup-card shadow-2-strong" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-5">
              <h2 className="mb-5 text-center">Sign Up Now.</h2>

              <form onSubmit={handleSubmit}>
                {/* Names Input */}
                <div className="row">
                  {/* First Name Input */}
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="typeFirstName"
                        name="firstName"
                        className="form-control form-control-lg"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Last Name Input */}
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="typeLastName"
                        name="lastName"
                        className="form-control form-control-lg"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Email Input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="typeEmailX-2"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Password Input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                {/* Confirm Password Input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typeConfirmPasswordX-2"
                    name="confirmPassword"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                {/* Error Message */}
                {error && <p className="text-danger">{error}</p>}

                {/* SignUp Button */}
                <div className="d-flex flex-column align-items-center mb-4">
                  <button
                    className="btn btn-primary custom-btn my-4"
                    type="button" // Change type to "button" to prevent form submission
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                  </button>
                </div>
              </form>

              {/* Link to Login Page */}
              <div className="text-center">
                <p className="mb-0">Already have an account? <Link to="/login">Login here</Link>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
