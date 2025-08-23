import { notifyError, notifySuccess } from "../utils/Notifications";
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../utils/Config';
import { CardEvento } from "../components/CardEvento/CardEvento";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom"; // <-- añadido

export const ID_Evento = () => {
        const {event_id} = useParams();


        const { dispatch, store } = useGlobalReducer()
        console.log(store)

        useEffect(() => {
                const eventoUsuarioLogin = async () => {
                        const tokenEvento = localStorage.getItem("token");
                        try {
                                const respuesta = await fetch(backendUrl + `api/events/${event_id}`, {
                                        method: 'GET',
                                        headers: {
                                                'Authorization': `Bearer ${tokenEvento}`,
                                                'Content-Type': 'application/json'
                                        }
                                });

                                const data = await respuesta.json();
                                console.log(data)

                                if (respuesta.ok) {
                                        dispatch({
                                                type: "ID_Evento",
                                                payload: data.response
                                        })
                                        notifySuccess("Aquí está tu listado de eventos");
                                } else {
                                        notifyError(data.message || "No tienes eventos disponibles");
                                }
                        } catch (error) {
                                notifyError("Error al cargar los eventos");
                        }
                };

                eventoUsuarioLogin();
        }, []);


        return (
                <div>
                        <h1>Mis eventos</h1>
                        <section className="grid-cards ">
                                {store.misEventos.length === 0 ? (
                                        <p>No tienes eventos creados aún.</p>
                                ) : (
                                        store.misEventos.map((evento, index) => (
                                                <CardEvento key={index} item={evento} isUser={true} />
                                        ))
                                )}
                        </section>
                </div>
        );
};