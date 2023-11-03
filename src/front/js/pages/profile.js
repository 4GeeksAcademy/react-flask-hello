import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";


export const Profile = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <div className="container-fluid">



                <div className="text-center m-3 mt-5 mb-5">
                    <h1>Perfil usuario</h1>
                </div>
                
                
            </div>
        </div>
    );
};