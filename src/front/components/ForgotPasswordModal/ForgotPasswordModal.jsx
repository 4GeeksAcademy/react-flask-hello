import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordModal = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
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
                throw new Error(data.error || "Usuario no encontrado");
            }


            const modalElement = document.getElementById('forgotPasswordModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();


            navigate(`/reset-password?username=${encodeURIComponent(username)}`);
        } catch (err) {
            console.error("Error al buscar usuario:", err);
            setError(err.message || "Error al buscar usuario");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal fade" id="forgotPasswordModal" tabIndex="-1" aria-labelledby="forgotPasswordModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="forgotPasswordModalLabel">
                            <i className="bi bi-key"></i> Reset password
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <div className="input-group">
                                    <span className="input-icon">
                                        <i className="bi bi-person"></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        placeholder="Write your username please"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-text mb-3">
                                Username to search your security question.
                            </div>
                            <div className="d-flex justify-content-end gap-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Exit
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Loading..." : "Continue"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};