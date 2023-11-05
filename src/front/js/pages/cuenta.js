import React from "react";
import LoginForm from "../component/login.js";
import RegisterForm from "../component/register.js";
import "../../styles/accountpage.css";

function AccountPage(){
    return(
        <div className="contSuperior">
                <div className="title-container text-center">
                    <h1>Cuenta</h1>
                    <div className="divider divider-default m-3"></div>
                </div>
                <div className="AccountPage-container">
                    <div>
                    <LoginForm/>
                    </div>
                    
                </div>
        </div>
    )
}

export default AccountPage;