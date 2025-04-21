import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PasswordReset.css";

export const PasswordReset = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [step, setStep] = useState(1);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const usernameParam = params.get("username");
        if (usernameParam) {
            setUsername(usernameParam);
            fetchSecurityQuestion(usernameParam);
        } else {
            navigate("/");
        }
    }, [location]);

    const fetchSecurityQuestion = async (username) => {
        setIsLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

            const response = await fetch(`${backendUrl}api/user/security-question`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ username })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "User not found");
            }

            setSecurityQuestion(data.security_question);
            setStep(2);
        } catch (err) {
            console.error("Error finding user:", err);
            setError(err.message || "Error finding user");
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyAnswer = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

            const response = await fetch(`${backendUrl}api/user/verify-security-answer`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    security_answer: securityAnswer
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Incorrect answer");
            }

            setStep(3);
        } catch (err) {
            console.error("Error verifying answer:", err);
            setError(err.message || "Incorrect answer");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");

        if (newPassword !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        setIsLoading(true);

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

            const response = await fetch(`${backendUrl}api/user/reset-password`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    security_answer: securityAnswer,
                    new_password: newPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error resetting password");
            }

            setSuccess(true);
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (err) {
            console.error("Error resetting password:", err);
            setError(err.message || "Error resetting password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="password-reset-page">
            <div className="password-reset container">
                <div className="form-header">
                    <h2>Reset Password</h2>
                    <p>Follow the steps to reset your password</p>
                </div>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="alert alert-success" role="alert">
                        Password reset successfully! Redirecting to login page...
                    </div>
                )}

                {step === 1 && (
                    <div className="loading-container text-center py-4">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Loading security question...</p>
                    </div>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyAnswer}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Security question:</label>
                            <p className="security-question p-3 bg-light rounded">{securityQuestion}</p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="securityAnswer" className="form-label">Your answer</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-shield-lock"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="securityAnswer"
                                    placeholder="Enter your answer"
                                    value={securityAnswer}
                                    onChange={(e) => setSecurityAnswer(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify answer"
                                )}
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => navigate("/")}
                            >
                                Back to login
                            </button>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword}>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">New password</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-lock"></i>
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="newPassword"
                                    placeholder="Enter your new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-lock-fill"></i>
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    placeholder="Confirm your new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Processing...
                                    </>
                                ) : (
                                    "Change password"
                                )}
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setStep(2)}
                            >
                                Back
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};