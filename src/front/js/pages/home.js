import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import LoginForm from "../component/LoginForm.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
        <div className="home-container">
            <LoginForm />
        </div>
    );
};
