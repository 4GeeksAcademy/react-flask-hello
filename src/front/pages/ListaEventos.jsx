import { notifyError } from "../utils/Notifications";
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../utils/Config';
import { CardEvento } from "../components/CardEvento/CardEvento";



export const ListaEventos = () => {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const listadoEventos = async () => {
            try {
                const respuesta = await fetch(backendUrl + `events`,);
                const data = await respuesta.json();
                setEventos(data.response);

                if (!respuesta.ok && data.length > 0) {
                    notifyError("No hay eventos disponibles");
                }
            } catch (error) {
                notifyError("Error al cargar los eventos");
            }
        };
        listadoEventos();
    }, []);


    return (
        <div>
            <h1>Lista de Eventos</h1>
           <section className="grid-cards ">
                   {eventos.length === 0 ? (
                     <p>No tienes eventos creados aún.</p>
                   ) : (
                     eventos.map((evento, index) => (
                       <CardEvento key={index} item={evento} isUser={false} />
                     ))
                   )}
                   </section>
        </div>
    );
};
