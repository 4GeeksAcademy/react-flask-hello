import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { TeachersCard } from "../component/TeachersCard.js";
import "../../styles/teachers.css";


import imagenClases from "../../img/fotonavacerrada.jpeg"
import imagenThePractices from "../../img/thepracticesSINFONDO.png"


export const Teachers = () => {
	const [state, setState] = useState({
   		
	});


	const { store, actions } = useContext(Context);


	useEffect(() => {
		actions.getAllTeachers();
	}, []);

	console.log(store.jivamuktiYoga)


	return (
   

		<div className="container-fluid mt-5 pt-5 text-center">
		<div className="d-flex justify-content-center mt-5 pt-5">   
			<h1 className="poiret-one-regular">The Teachers</h1>
		</div> 
	
		<div className="container mt-2 d-flex justify-content-center">
			<div className="row">
				{store.teachers.map(item => (
					<div className="col-lg-4 col-md-4 col-sm-4 mb-4 mt-2 me-3" key={item.id}>
						<TeachersCard 
							id={item.id}
							name={item.name}
							last_name={item.last_name}
							residence={item.residence}
							biografy={item.biografy}
							url_imagen={item.url_imagen}
						/>
					</div>
				))}

			<div className="col-lg-12 col-md-12 col-sm-12 mb-4 mt-2">
				<Link to="/sessions">
				<button className="btn btn-outline-secondary">Back to home</button>
				</Link>
			</div>
			</div>
			
		</div>
	</div>

	
		
	);
 };
