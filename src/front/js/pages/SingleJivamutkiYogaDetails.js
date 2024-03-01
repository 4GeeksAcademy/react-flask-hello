// import React, { useState, useEffect, useContext } from "react";
// import PropTypes from "prop-types";
// import { Link, useParams } from "react-router-dom";
// import { Context } from "../store/appContext";
// // import { HathaYogaDetailsCard } from "../component/HathaYogaDetailsCard";
// import "../../styles/singleDetails.css";
// import { JivamutkiYogaDetailsCard } from "../component/JivamutkiYogaDetailsCard";

// export const SingleJivamutkiYogaDetails = () => {
// 	const { store, actions } = useContext(Context);

// 	// Creamos un espacio para guardar los params de la ruta creada.
// 	const params = useParams();
// 	// console.log(params.theid)

// 	useEffect(() => {
// 		actions.getOneJivamukti(params.theid)
// 		// Envias a la función la parte que coge la url dinamica y se lo pasas al flux como parametro.

// 	}, [])

// 	return (
// 		<div className="jumbotron align-items-center container-fluid h-100 pb-5 pt-4 stylebackground my-5">
// 			<div className=" h-100 w-100">
// 				<JivamutkiYogaDetailsCard />
// 			</div>
// 		</div>
// 	);
// };

// SingleJivamutkiYogaDetails.propTypes = {
// 	match: PropTypes.object
// };
