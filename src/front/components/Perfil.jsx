import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthServices from "../services/auth.services";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Perfil = () =>{

    const handleSubmit = e => {
            e.preventDefault();
            AuthServices.login(formData).then(data => {
                console.log(data)
                dispatch({type: 'login', payload: data.user})
            })
        }


    return(
        <>
        <div className="border border-danger bg-light d-flex justify-content-center">
            <div className="card p-4 shadow-lg" style={{width: "100rem"}}>
                <h1 className="text-center mb-3 text-danger"><strong>User Name</strong></h1>
                
            </div>
        </div>
        </>
    );
} 
export default Perfil