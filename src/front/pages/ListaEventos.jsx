import { notifyError } from "../utils/Notifications";
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../utils/Config';
import { CardEvento } from "../components/CardEvento/CardEvento";
import { Link } from "react-router-dom"; // <-- añadido

export const ListaEventos = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const listadoEventos = async () => {
      try {
        const respuesta = await fetch(backendUrl + `events`);
        const data = await respuesta.json();
        console.log(data);

        if (!respuesta.ok) {
          notifyError("Error al cargar los eventos");
          return;
        }

        setEventos(data.response);
      } catch (error) {
        notifyError("Error al cargar los eventos");
      }
    };
    listadoEventos();
  }, []);

  return (
    <div>
      <h1>Lista de Eventos</h1>
      <section className="grid-cards">
        {eventos.length === 0 ? (
          <p>No hay eventos creados aún.</p>
        ) : (
          eventos.map((evento) => (
            <Link key={evento.id} to={`/evento/${evento.id}`} className="card-link">
              <CardEvento item={evento} isUser={false} />
            </Link>
          ))
        )}
      </section>
    </div>
  );
};
