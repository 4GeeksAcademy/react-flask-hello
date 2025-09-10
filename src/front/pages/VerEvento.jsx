import React, { useEffect, useState } from "react";
import { backendUrl } from "../utils/Config";
import { notifyError, notifySuccess } from "../utils/Notifications";

export const VerEvento = () => {
  const [eventos, setEventos] = useState([]);
  const [nombreFiltro, setNombreFiltro] = useState("");

  useEffect(() => {
    const verEvento = async () => {
      try {
        const respuesta = await fetch(`${backendUrl}events/listado-eventos`);
        
        const data = await respuesta.json();
        setEventos(data);

        if (respuesta.ok && data.length > 0) {
          notifySuccess("Aquí está el listado de eventos");
        } else {
          notifyError("No hay eventos disponibles");
        }
      } catch (error) {
        notifyError("Error al cargar los eventos");
      }
    };

    verEvento();
  }, []);

  const eventoFiltrado = eventos.filter(
    (evento) => evento.titulo.toLowerCase() === nombreFiltro.toLowerCase()
  );

  return (
    <div>
      <h1>Buscar Evento por Nombre</h1>
      <input
        type="text"
        placeholder="Escribe el nombre del evento"
        value={nombreFiltro}
        onChange={(e) => setNombreFiltro(e.target.value)}
        style={{ padding: "8px", marginBottom: "20px", width: "300px" }}
      />

      <section>
        {eventoFiltrado.length > 0 ? (
          eventoFiltrado.map((evento, index) => (
            <div key={index} style={{ marginBottom: "30px" }}>
              <h3>{evento.titulo}</h3>
              <p><strong>Fecha:</strong> {evento.fecha}</p>
              <p><strong>Categoría:</strong> {evento.categoria}</p>
              <p><strong>Precio:</strong> {evento.precio}€</p>
              {evento.definicion && <p><em>{evento.definicion}</em></p>}
              {evento.portada && (
                <img
                  src={evento.portada}
                  alt="Portada"
                  style={{ maxWidth: "300px", marginTop: "10px" }}
                />
              )}
            </div>
          ))
        ) : (
          <p>No se encontró ningún evento con ese nombre</p>
        )}
      </section>
    </div>
  );
};