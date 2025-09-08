import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PasswordRequestReset = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!email) {
            setError("Please enter your email.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/password-request`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const json = await res.json().catch(() => ({}));

            if (!res.ok) {
                setError(json.error || "Something went wrong. Please try again.");
                return;
            }

            setSuccess("Check your email for the password reset link.");

            
            setTimeout(() => {
                navigate("/signin", { replace: true });
            }, 3000);

        } catch (networkError) {
            console.error(networkError);
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container justify-content-center d-flex flex-column vh-100 align-items-center">
            <h2 className="display-6 text-primary text-center mb-4">
                <i className="bi bi-envelope-fill me-2"></i>
                Forgot your password?
            </h2>
            <div className="card shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
                <div className="card-body">
                    <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address:</label>
                            <input
                                className="form-control"
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            {loading ? "Sending..." : "Send reset link"}
                        </button>
                        {error && (
                            <div className="alert alert-danger mt-3">{error}</div>
                        )}
                        {success && (
                            <div className="alert alert-success mt-3">{success}</div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};
