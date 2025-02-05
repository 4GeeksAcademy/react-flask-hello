import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/hostProfile.css";
import { HostCard } from "../component/hostCard.jsx";


export const HostProfile = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="pt-5 px-5 bg-light">
        <h1>Perfil</h1>
        <hr className="mb-0"></hr>
            <HostCard viewMode={'hostPage'} />
        </div>
    );
};