// import React, { useState, useEffect, useContext } from "react";
// import PropTypes from "prop-types";
// import { Link, useParams } from "react-router-dom";
// import { Context } from "../store/appContext";
// // import { HathaYogaDetailsCard } from "../component/HathaYogaDetailsCard";
// import "../../styles/singleDetails.css";
// import { VinyasaYogaDetailsCard } from "../component/VinyasaYogaDetailsCard";

// export const SingleVinyasaYogaDetails = () => {
// 	const { store, actions } = useContext(Context);

// 	// Creamos un espacio para guardar los params de la ruta creada.
// 	const params = useParams();
// 	// console.log(params.theid)

// 	useEffect(() => {
// 		actions.getOneVinyasa(params.theid)
// 		// Envias a la función la parte que coge la url dinamica y se lo pasas al flux como parametro.

// 	}, [])

// 	return (
// 		<div className="jumbotron align-items-center container-fluid h-100 pb-5 pt-4 stylebackground my-5">
// 			<div className=" h-100">
// 				<VinyasaYogaDetailsCard />
// 			</div>
// 		</div>
// 	);
// };

// SingleVinyasaYogaDetails.propTypes = {
// 	match: PropTypes.object
// };
