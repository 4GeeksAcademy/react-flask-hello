import { notifyError } from "../utils/Notifications";
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../utils/Config';



export const ListaEventos = () => {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const listadoEventos = async () => {
            try {
                const respuesta = await fetch(backendUrl + `events/listado-eventos`,);
                const data = await respuesta.json();
                setEventos(data);

                if (respuesta.ok && data.length > 0) {
                    notifySuccess("Aqui esta el listado de eventos");
                } else {
                    notifyError("No hay eventos disponibles");
                }
            } catch (error) {
                notifyError("Error al cargar los eventos");
            }
        };
        listadoEventos();
    }, []);
    const verEventos = eventos.map((evento) => ({
            titulo: evento.titulo,
            fecha: evento.fecha,
            categoria: evento.categoria,
            precio: evento.precio,
            id_creador_evento: evento.id_creador_evento,
            definicion: evento.definicion,
            portada: evento.portada,
        }));


    return (
        <div>
            <h1>Lista de Eventos</h1>
            <section>
                {verEventos.map((evento, index) => (
                    <div key={index}>
                        <h3>{evento.titulo}</h3>
                        <p><strong>Fecha:</strong> {evento.fecha}</p>
                        <p><strong>Categoría:</strong> {evento.categoria}</p>
                        <p><strong>Precio:</strong> {evento.precio}€</p>
                        {evento.definicion && <p><em>{evento.definicion}</em></p>}
                        <br />
                    </div>
                ))}
            </section>
            );
        </div>
    );
};
