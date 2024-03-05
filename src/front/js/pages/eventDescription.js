import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { EventDescriptionCard } from "../component/eventDescriptionCard";

export const EventDescription = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	useEffect(() => {
		async function getEvents() {
			await actions.obtenerInfoUsuario()
			await actions.obtenerOneEvento(params.theid)
		}
		getEvents()
	}, [])

	return (
		<div className="vh-100">
			<EventDescriptionCard precio={store.eventInfo?.result?.precio} ciudad={store.eventInfo?.result?.ciudad} ubicacion={store.eventInfo?.result?.ubicación} user_creador={store.eventInfo?.result?.user_creador} img={store.eventInfo?.result?.url_img} id_evento={params.theid} evento={store.eventInfo?.result?.evento} descripcion={store.eventInfo?.result?.descripcion} asistentes={store.eventInfo?.asistentes} maximo={store.eventInfo?.result?.max_personas} fecha={store.eventInfo?.result?.fecha} />
		</div>
	);
};

EventDescription.propTypes = {

};
