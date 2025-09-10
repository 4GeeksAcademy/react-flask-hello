import { notifyError, notifySuccess } from "../utils/Notifications";
import React, { useEffect } from 'react';
import { backendUrl } from '../utils/Config';
import { CardEvento } from "../components/CardEvento/CardEvento";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom"; // <-- añadido

export const MisEventos = () => {
  const { dispatch, store } = useGlobalReducer();

  useEffect(() => {
    const eventoUsuarioLogin = async () => {
      const tokenUsuario = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      try {
        const respuesta = await fetch(backendUrl + `events/mis-eventos/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${tokenUsuario}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await respuesta.json();

        if (respuesta.ok) {
          dispatch({
            type: "setMyEvents",
            payload: data.response
          });
          notifySuccess("Aquí está tu listado de eventos");
        } else {
          notifyError(data.message || "No tienes eventos disponibles");
        }
      } catch (error) {
        notifyError("Error al cargar los eventos");
      }
    };

    eventoUsuarioLogin();
  }, [dispatch]);

  return (
    <div>
      <h1>Mis eventos</h1>
      <section className="grid-cards">
        {store.misEventos.length === 0 ? (
          <p>No tienes eventos creados aún.</p>
        ) : (
          store.misEventos.map((evento) => (
            <Link key={evento.id} to={`/evento/${evento.id}`} className="card-link">
              <CardEvento item={evento} isUser={true} />
            </Link>
          ))
        )}
      </section>
    </div>
  );
};
