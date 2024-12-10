import React, { useState, useEffect, useContext } from "react";
import NavBar from "../component/Navbar";
import "../../styles/components.css";
import { Context } from "../store/appContext";
import { LeftMenuTeacher } from "../component/leftMenuTeacher";
import ChatComponent from "../component/chatComponent";

export const DashboardTeacher = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid mt-5">
            <NavBar />
            <div className="row">
                <div className="col mt-5">
                    <LeftMenuTeacher />
                    {store.isChatVisible && <ChatComponent />}
                </div>
            </div>
        </div>
    );
}

export default DashboardTeacher;