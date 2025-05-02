import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect } from 'react'
import { Link, useParams } from "react-router-dom";

export const PasswordRecovery = () => {




useEffect(()=> {
},[]);

return (
    <div className= "text-center" >
        <h1>Forgot Password</h1>
        <p>Enter your email address and we will send you a link to reset your password</p>
        <input/>
        <button>
            Send Reset Link
        </button>
    </div>

)
};