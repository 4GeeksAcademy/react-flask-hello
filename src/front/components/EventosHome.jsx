import { notifyError } from "../utils/Notifications";
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../utils/Config';
import { CardEvento } from "../components/CardEvento/CardEvento";
import { Link } from "react-router-dom";


export const EventosHome = () => {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const listadoEventos = async () => {
            try {
                const respuesta = await fetch(backendUrl + `events`,);
                const data = await respuesta.json();

            if (!respuesta.ok) {
                notifyError("Error al cargar los eventos");
                return;
                }
                let lista = data.response;

                for (let i = lista.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [lista[i], lista[j]] = [lista[j], lista[i]];
                }

                setEventos(lista.slice(0, 3));

        } catch (error) {
            notifyError("Error al cargar los eventos");
        }
    };
    listadoEventos();
}, []);


    return (
        <div>
            <h1>Estos son algunos de los eventos a los que te puedes apuntar</h1>
           <section className="grid-cards ">
                   {eventos.length === 0 ? (
                     <p>No hay eventos creados aún.</p>
                   ) : (
                        eventos.map((evento, index) => (
                        <Link key={evento.id} to={`/evento/${evento.id}`} className="card-link">
                            <CardEvento key={evento.id ?? index} item={evento} isUser={false} />
                        </Link>
                     ))
                   )}
                   </section>
        </div>
    );
};
