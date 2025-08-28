import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../utils/Config";
import useGlobalReducer from "../hooks/useGlobalReducer";

const money = (v) =>
        Number(v) === 0
                ? "Gratis"
                : new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" })
                        .format(Number(v || 0));
const fmtDate = (s) => {
        if (!s) return "—";
        const d = new Date(s);
        return isNaN(d)
                ? s
                : d.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
};

export const ID_Evento = () => {
        const { event_id } = useParams();
        const { store } = useGlobalReducer();

        const [evento, setEvento] = useState(null);
        const findEvent = store.eventos.find((e) => e.id == event_id);

        useEffect(() => {
                setEvento(findEvent || null);
        }, []);

        useEffect(() => {
                if (!findEvent) getEvent();
        }, []);

        const getEvent = async () => {
                try {
                        const res = await fetch(backendUrl + `events/${event_id}`);
                        const json = await res.json();
                        setEvento(json?.data ?? json);
                        console.log(json);
                } catch (e) {
                        console.error(e);
                }
        };

        if (!evento) {
                return (
                        <div style={{ padding: 24 }}>
                                <h1>Cargando...</h1>
                        </div>
                );
        }

        const gmaps =
                evento.latitud && evento.longitud
                        ? `https://www.google.com/maps?q=${encodeURIComponent(
                                `${evento.latitud},${evento.longitud}`
                        )}`
                        : null;

        return (
                <div className="detalle-ev">
                        <div className="container">
                                {/* HERO */}
                                <div className="detalle-ev__hero">
                                        <img src={evento.portada} alt={evento.titulo} />
                                        {evento.categoria && <span className="chip">{evento.categoria}</span>}

                                        <div className="detalle-ev__hero-content">
                                                <h1>{evento.titulo}</h1>

                                                <ul className="badges">
                                                        <li>{fmtDate(evento.fecha)}</li>
                                                        {"precio" in evento && <li>{money(evento.precio)}</li>}
                                                        {"max_asist" in evento && <li>{evento.max_asist} plazas</li>}
                                                </ul>

                                                <div className="cta-row">
                                                        <a className="btn" href="#inscribirse">Apuntarme</a>
                                                        <a
                                                                className="btn btn--ghost"
                                                                href={gmaps || "#"}
                                                                target={gmaps ? "_blank" : undefined}
                                                                rel={gmaps ? "noreferrer" : undefined}
                                                        >
                                                                Ver mapa
                                                        </a>
                                                </div>
                                        </div>
                                </div>

                                {/* CONTENT GRID */}
                                <div className="detalle-ev__grid">
                                        <section className="panel">
                                                <h2>Información</h2>
                                                <ul className="info-list">
                                                        <li><strong>Fecha:</strong> {fmtDate(evento.fecha)}</li>
                                                        <li><strong>Precio:</strong> {money(evento.precio)}</li>
                                                        {"max_asist" in evento && (
                                                                <li><strong>Plazas máx.:</strong> {evento.max_asist}</li>
                                                        )}
                                                        {gmaps && (
                                                                <li>
                                                                        <strong>Ubicación:</strong>{" "}
                                                                        <a href={gmaps} target="_blank" rel="noreferrer">
                                                                                {evento.latitud}, {evento.longitud}
                                                                        </a>
                                                                </li>
                                                        )}
                                                        {evento.id_creador_evento && (
                                                                <li><strong>ID creador:</strong> {evento.id_creador_evento}</li>
                                                        )}
                                                        {evento.categoria && (
                                                                <li><strong>Categoría:</strong> {evento.categoria}</li>
                                                        )}
                                                </ul>
                                        </section>

                                        {evento.definicion && (
                                                <section className="panel">
                                                        <h2>Descripción</h2>
                                                        <p>{evento.definicion}</p>
                                                </section>
                                        )}
                                </div>
                        </div>
                </div>
        );
};
