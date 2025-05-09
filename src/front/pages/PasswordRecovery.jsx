import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";

export const PasswordRecovery = () => {

    const [newPassword, setNewPassword] = useState("")
    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const backendUrl = import.meta.env.VITE_BACKEND_URL


    const resetPassword = () => {
        const options ={
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                // "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                email: email,
                password: newPassword
            })
        }
        fetch(backendUrl+ "/api/reset_password", options)
        .then((resp) => {
            return resp.json()
        .then((data) => {
            if (resp.ok){
                console.log(data);
            } else setErrorMessage(data.error || "An error occured during password reset.");
        });
    })
    }

    useEffect(() => {
        }, [])

return (
    <div className= "text-center" >
        <h1>Forgot Password</h1>
        <p>Please enter your email and new password. If an account exists with the email you provided, 
            your password will be reset successfully.
        </p>
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Enter your email" />
        <input onChange={(e)=> setNewPassword(e.target.value)} value={newPassword} type="password" placeholder="Enter New password"/>
         {/* <input onChnage={(e)=> setNewPassword(e.target.value)} value={newPassword} type="password" placeholder="Confirm New PAssword"/>  */}
        <button onClick={resetPassword}>
            Reset Password
        </button>
        {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}
        <div>
            <Link to="/login">Return to Login</Link>
        </div>
    </div>

)
}