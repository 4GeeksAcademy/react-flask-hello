import React, { useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { useContext } from "react";

export const Login = ({ isLoginDefault, onClose, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(isLoginDefault); // Control Login/Sign-Up toggle
    const [error, setError] = useState(null); // Track errors
    const { store, actions, setStore } = useContext(Context);

    const handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = e.target.elements;
        actions.login(username.value, password.value)
        onClose()
    }
    //     await fetch(process.env.BACKEND_URL+"api/login", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             email: username.value,
    //             password: password.value,
    //         })
    //     }).then(res => {
    //         if (!res.ok) throw Error(res.statusText);
    //         return res.json();
    //     }).then((response) => {
    //         actions.setUserId ( response.user.id );
    //         actions.setUserName ( response.user.username);

    //         onClose()
    //     }).catch(error => console.error(error));
    // };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const { username, email, confirmEmail, password, confirmPassword } = e.target.elements;

        // Validation checks
        if (email.value !== confirmEmail.value) {
            setError("Emails do not match.");
            return;
        }
        if (password.value !== confirmPassword.value) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const payload = {
                email: email.value,
                password: password.value,
                username: username.value
            };

            const response = await fetch(process.env.BACKEND_URL + "api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload), // Send email and password as JSON
            });

            const responseData = await response.json();

            if (!response.ok) {
                setError(responseData.error || "Sign-up failed"); // Handle backend errors
                return;
            }

            alert("Registration successful! You can now log in."); // Notify success
            setIsLogin(true); // Switch to login view
        } catch (err) {
            console.error("Sign-up error:", err);
            setError("An error occurred while signing up."); // Catch unexpected errors
        }
    };

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{isLogin ? "Login" : "Sign Up"}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose} // Close modal handler
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex justify-content-center mb-3">
                            <button
                                className={`btn ${isLogin ? "btn-primary" : "btn-outline-primary"} me-2`}
                                onClick={() => {
                                    setError(null);
                                    setIsLogin(true);
                                }}
                            >
                                Login
                            </button>
                            <button
                                className={`btn ${!isLogin ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => {
                                    setError(null);
                                    setIsLogin(false);
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {isLogin ? (
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="username" name="username" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" required />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        ) : (
                            <form onSubmit={handleSignUp}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" name="username" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmEmail" className="form-label">Confirm Email</label>
                                    <input type="email" className="form-control" id="confirmEmail" name="confirmEmail" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" required />
                                </div>
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Define PropTypes for the component
Login.propTypes = {
    isLoginDefault: PropTypes.bool, // Whether to default to the Login view
    onClose: PropTypes.func.isRequired, // Function to close the modal
    onLoginSuccess: PropTypes.func.isRequired // Function to handle login success
};
