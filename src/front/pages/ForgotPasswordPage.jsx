import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSendResetLink = async (e) => {
        e.preventDefault();
        console.log("Solicitud de restablecimiento de contraseña para:", email);
        alert(`Si el correo ${email} está registrado, recibirás un enlace de restablecimiento.`);
        navigate("/");
    };

    return (
        <div className="signup-page-container">
            <div className="login-content-wrapper">
                <div className="login-form-card p-4">
                    <h2 className="text-center mb-4">Forgot your password?</h2>
                    <p className="text-center text-muted mb-4">
                        Enter your email address below and we'll send you a password reset link.
                    </p>
                    <form onSubmit={handleSendResetLink}>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="emailInput"
                                placeholder="tuemail@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-grid gap-2 mb-3">
                            <button type="submit" className="btn btn-primary btn-lg">
                                Send reset link
                            </button>
                        </div>
                        <div className="text-center">
                            <Link to="/">Back to login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};