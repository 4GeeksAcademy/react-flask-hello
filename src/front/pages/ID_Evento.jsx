import { notifyError, notifySuccess } from "../utils/Notifications";
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../utils/Config';
import { CardEvento } from "../components/CardEvento/CardEvento";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";

export const ID_Evento = () => {
        const { event_id } = useParams();
        const { dispatch, store } = useGlobalReducer();
        const [evento, setEvento] = useState(null);
        const findEvent = store.eventos.find(event => event.id == event_id)

        useEffect(() => {
                if (!findEvent) {
                        console.log("Evento no encontrado");
                        getEvent()
                }
        }, []);

        const getEvent = async () => {
                let res = await fetch(backendUrl + `events/${event_id}`,);
                let data = await res.json()
                setEvento(data)
                console.log(data)

        }

        if (!findEvent) {
                return (
                        <div>
                                <h1>Cargando...</h1>
                        </div>
                );
        }
        return (
                <div>
                        <h1>Evento {findEvent.titulo}</h1>
                        <img src={findEvent.portada} alt={findEvent.titulo} />

                </div>
        );
};