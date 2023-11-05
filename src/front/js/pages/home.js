import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="landing-page container my-5">
			<div className="first-block d-inline-flex">
		<div className="text-main-box">
			<h1 className="text-main">Queremos que tengas la oportunidad de llevar tu potencial al máximo</h1>
		</div>
		<div className="image-side">
			<img className="first-img" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2942&q=80"/>
		</div>
		</div>
		</div>
	);
};
