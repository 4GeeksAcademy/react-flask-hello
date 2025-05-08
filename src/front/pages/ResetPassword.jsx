import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";




export const ResetPassword = () => {
    const location = useLocation(); // it gives you an object describing the current URL your user is on.
    const queryParams = new URLSearchParams(location.search) // Parse the query string in the URL into a map-like object
    const token = queryParams.get("token") //  → either the token string or null

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = () => {
        e.preventDefault();
        console.log({ token, newPassword, confirmPassword });

    }


    return (

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="password">New password:</label>
                <input
                    id="password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div>
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button type="submit">Save new password</button>
        </form>


    );

}