import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import "../../styles/aboutUs.css";
import logo from "../../img/logoOCEANOM.png";


import imagenClases from "../../img/fotonavacerrada.jpeg"
import imagenThePractices from "../../img/thepracticesSINFONDO.png"


export const AboutUs = () => {
	const [state, setState] = useState({
   		
	});


	const { store, actions } = useContext(Context);


	useEffect(() => {
		
	}, []);




	return (
   

		<div className="container-fluid mt-5 pt-5 text-center">
		<div className="d-flex justify-content-center mt-4 pt-4">   
			<h1 className="poiret-one-regular fontaboutus">About Us</h1>
		</div> 
	
		<div className="container-fluid mt-2 d-block justify-content-center">
		<div className="container-fluid d-block justify-content-center stylebackgroundsquare p-5">
            <img src={logo} className="ms-3" alt="..." style={{width: "50%"}}/>
			<div className="mt-3">
				<span className="text-white span">
					Ocean of Om is a worldwide Yoga Hub, which looks for create a yoga community that doesn't know about separation. That is unified by one unique ocean. We want to put down the walls between the sky and the sea, the students and the teachers, one country and another and between us and you. Our purpose is to create a place for you to practice with any teacher without the barriers of physical distance. Also, we want teachers to expand their spiritual teachings to the whole world. We know changing the globe can be a huge purpose, but at least we want to touch people's heart. Your heart.
				</span>
			</div>
		</div>

			<div className="col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
				<Link to="/sessions">
				<button className="btn btn-outline-secondary">Back to home</button>
				</Link>
			</div>
		</div>
			
		
	</div>

	
		
	);
 };
