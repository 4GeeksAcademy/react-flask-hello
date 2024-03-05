import React, { useContext, useEffect } from "react";
import { LoginModal } from "../component/LoginModal.js"
import "../../styles/home.css";
import { useNavigate } from 'react-router-dom';
import { Card } from "../component/card.js";
import { Navbar } from "../component/navbar.js";

//include images into your bundle
// import rigoImage from "../../img/rigo-baby.jpg";
import Jumbotron from "../component/jumbotron.js";
import { Footer } from "../component/footer.js";
import { Context } from "../store/appContext.js";

export const Home = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate();
	useEffect(() => { // // cada vez que quiera ejecutar una funcion ni bien se cargue el componente debo hacer un useEffect, React dice esto va asi! siempre antes del return
		actions.obtenerEventos()
		
	}, [])

	async function handleClickAll() {
		await actions.obtenerEventosCategoria("ALL")
		navigate('/events/ALL');
	}
	async function handleClickDeporte() {
		await actions.obtenerEventosCategoria("DEPORTE")
		navigate('/events/DEPORTE');
	}
	async function handleClickArte() {
		await actions.obtenerEventosCategoria("ARTE")
		navigate('/events/ARTE');
	}
	async function handleClickOcio() {
		await actions.obtenerEventosCategoria("OCIO")
		navigate('/events/OCIO');
	}

	return (
		<div className="container">
			<Jumbotron /> 
			<div className="4-botones d-flex justify-content-center row m-1 mt-5">
				<button type="button" onClick={handleClickAll} className="btn btn-lg m-1 bg-300 text-black col-sm-8 col-md-12 col-lg-2">EVENTS</button>
				<button type="button" onClick={handleClickDeporte} className="btn btn-lg m-1 bg-300 text-black col-sm-8 col-md-12 col-lg-2">Sports</button>
				<button type="button" onClick={handleClickArte} className="btn btn-lg m-1 bg-300 text-black col-sm-8 col-md-12 col-lg-2">Art</button>
				<button type="button" onClick={handleClickOcio} className="btn btn-lg m-1 bg-300 text-black col-sm-8 col-md-12 col-lg-2">Leisure</button>
			</div>

			<div className="row py-5">
				<p className="fs-2 col-sm-12 col-md-6 col-lg-5"><strong>Don't forget to see the events!</strong></p>
			</div>
			<div className="row m-1">
				<ul className="list-group d-flex flex-row overflow-auto mb-5" id="contact-list">
					{store.events.map((item) => (
						<li className="list-group col-xl-3 col-lg-4 col-md-6 col-12 mb-2 pe-2" key={item.id}>
							<Card img={item.url_img} evento={item.evento} descripcion={item.descripcion} ciudad={item.ciudad} fecha={item.fecha} id={item.id} />
						</li>
					))}
				</ul>
			</div>
			<p className="fs-2 col-sm-12 col-md-6 col-lg-12 d-flex justify-content-center py-5"><strong>If you don't have the time to travel, we bring the plans for you!</strong></p>
		</div>
	);
};
