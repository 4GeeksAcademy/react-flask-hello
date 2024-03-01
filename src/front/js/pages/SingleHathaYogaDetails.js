import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { HathaYogaDetailsCard } from "../component/HathaYogaDetailsCard";
import "../../styles/singleDetails.css";

export const SingleHathaYogaDetails = () => {
	const { store, actions } = useContext(Context);

	// Creamos un espacio para guardar los params de la ruta creada.
	const params = useParams();
	// console.log(params.theid)

	useEffect(() => {
		// actions.getCharacterDetails(params.theid)
		// Envias a la función la parte que coge la url dinamica y se lo pasas al flux como parametro.

	}, [])

	return (
		<div className="jumbotron align-items-center container-fluid h-100 py-5 stylebackground">
			<div className=" h-100">
				<HathaYogaDetailsCard />
			</div>
		</div>
	);
};

SingleHathaYogaDetails.propTypes = {
	match: PropTypes.object
};
