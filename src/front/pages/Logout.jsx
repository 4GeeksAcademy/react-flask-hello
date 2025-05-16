import React from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication token
        localStorage.removeItem("token");

        // Redirect to signup page
        navigate("/signin");
    };

    return (
        <div className="logout-container">
            <h2>You have been logged out</h2>
            <p>Click below to sign in again.</p>
            <button className="logout-button" onClick={handleLogout}>
                Go to Sign In
            </button>
        </div>
    );
};
