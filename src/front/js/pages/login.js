import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Formulario } from "../component/formulario";
import { useNavigate } from "react-router-dom";

export const Login = (email, password) => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate();

	console.log(email, password);
	return (
		<div className="container-fluid">
			<Formulario />
		</div>
	);
};
