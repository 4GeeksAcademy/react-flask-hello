import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../utils/Config";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { MapPin } from "lucide-react";
const MADRID_LOCATION = { lat: 40.4168, lng: -3.7038 };

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
        const [user, setUser] = useState(null);

        const findEvent = store.eventos.find((e) => e.id == event_id);

        useEffect(() => {
                if (!findEvent) {
                        getEvent()
                } else {
                        setEvento(findEvent)
                        getUserInfo(findEvent.id_creador_evento)

                }
        }, []);


        const getEvent = async () => {
                try {
                        const res = await fetch(backendUrl + `events/${event_id}`);
                        const json = await res.json();
                        console.log(json)
                        setEvento(json?.data ?? json);
                        getUserInfo(json.data.id_creador_evento)

                        console.log(json);
                } catch (e) {
                        console.error(e);
                }
        };

        const getUserInfo = async (id) => {
                try {
                        const res = await fetch(backendUrl + `user/${id}`);
                        const json = await res.json();
                        setUser(json?.data ?? json);
                } catch (e) {
                        console.error(e);
                }
        };

        console.log(user)



        if (!evento || !user) {
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

        console.log(evento)
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

                                                        {gmaps && (
                                                                <a className="btn btn--ghost" href={gmaps} target="_blank" rel="noreferrer">
                                                                        Ver ubicación
                                                                </a>
                                                        )}


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

                                                        {user && (
                                                                <li><strong>Anfitrión:</strong> {user?.resp.nickname}</li>
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
                                <br />
                                {gmaps && (
                                        <div className="panel">
                                                <APIProvider apiKey={import.meta.env.VITE_MAP_GOOGLE}>
                                                        <Map defaultZoom={14}
                                                                style={{ width: '100%', height: '50vh', borderRadius: "25px" }}
                                                                defaultCenter={{ lat: evento.latitud, lng: evento.longitud }}
                                                                mapId={import.meta.env.VITE_MAP_ID}
                                                                mapTypeControl={false}
                                                                disableDefaultUI={true}
                                                                clickableIcons={false}
                                                                disableDoubleClickZoom={true}
                                                                zoomControl={true}
                                                                gestureHandling={'greedy'}

                                                        >
                                                                <AdvancedMarker position={{ lat: evento.latitud, lng: evento.longitud }}>
                                                                        <MapPin style={{ color: "black" }} />
                                                                </AdvancedMarker>
                                                        </Map>
                                                </APIProvider>
                                        </div>

                                )}



                        </div>
                </div >
        );
};