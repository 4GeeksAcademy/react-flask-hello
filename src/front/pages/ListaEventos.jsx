import { notifyError } from "../utils/Notifications";
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../utils/Config';
import { CardEvento } from "../components/CardEvento/CardEvento";
import { Link } from "react-router-dom"; // <-- añadido
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ListaEventos = () => {
  const { dispatch, store } = useGlobalReducer();

    useEffect(() => {
        const listadoEventos = async () => {
            try {
                const respuesta = await fetch(backendUrl + `events`,);
                const data = await respuesta.json();

        if (!respuesta.ok) {
          notifyError("Error al cargar los eventos");
          return;
        }

        dispatch({
          type: "setEvents",
          payload: data.response
        })

      } catch (error) {
        notifyError("Error al cargar los eventos");
      }
    };
    listadoEventos();
  }, []);


    return (
        <div >
            <h1>Lista de Eventos</h1>
           <section className="grid-cards " style={{margin: "3rem"}}>
                   {eventos.length === 0 ? (
                     <p>No hay eventos creados aún.</p>
                   ) : (
                     eventos.map((evento, index) => (
                       <CardEvento key={index} item={evento} isUser={false} />
                     ))
                   )}
                   </section>
        </div>
    );
};
