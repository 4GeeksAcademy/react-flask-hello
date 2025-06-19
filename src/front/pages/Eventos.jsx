import React, { useState } from "react";
import ReactPlayer from "react-player";
import "../../styles/eventos.css";
import Mapa from "../components/Mapa.jsx";
import CountdownTimer from "../components/CountdownTimer.jsx";

function Eventos() {
    const lugares = [
        {
            nombre: "Barcelona",
            descripcion: "Parque de la Ciutadella",
            imagen: "barcelona.jpg",
            lat: 41.3881,
            lng: 2.1811,
            hora: "18:00",
            asistentes: "100 personas",
            fechaISO: "2025-09-22T20:00:00"
        },
        {
            nombre: "Madrid",
            descripcion: "Parque del Retiro",
            imagen: "retiro.jpg",
            lat: 40.411766,
            lng: -3.687116,
            hora: "19:00",
            asistentes: "80 personas",
            fechaISO: "2025-06-23T19:00:00"
        },
        {
            nombre: "Cáceres",
            descripcion: "Parque del Príncipe",
            imagen: "principe.jpg",
            lat: 39.473704,
            lng: -6.383523,
            hora: "18:30",
            asistentes: "40 personas",
            fechaISO: "2025-06-24T18:30:00"
        },
        {
            nombre: "Talavera de la Reina",
            descripcion: "Parque la Alameda",
            imagen: "talavera.jpg",
            lat: 39.959866,
            lng: -4.821326,
            hora: "18:00",
            asistentes: "45 personas",
            fechaISO: "2025-06-25T18:00:00"
        },
        {
            nombre: "Sevilla",
            descripcion: "Parque de María Luisa",
            imagen: "sevilla.jpg",
            lat: 37.375817,
            lng: -5.987878,
            hora: "20:00",
            asistentes: "163 personas",
            fechaISO: "2025-06-26T20:00:00"
        },
        {
            nombre: "Madrid",
            descripcion: "Parque el Palacio de Cristal",
            imagen: "palacio.jpg",
            lat: 40.39237,
            lng: -3.700065,
            hora: "17:00",
            asistentes: "188 personas",
            fechaISO: "2025-06-27T17:00:00"
        }
    ];

    const [data, setData] = useState(null);

    return (
        <div className="eventos-container">
            <h1 className="titulo-eventos">Eventos activos</h1>

            <div className="grid-direcciones">
                {lugares.map((lugar, i) => (
                    <div key={i} onClick={() => setData(lugar)} className="direccion-item">
                        {lugar.descripcion}
                    </div>
                ))}
            </div>

            {!data ? (
                <div className="row">
                    <div className="col-md-12">
                        {/* SOLO VISIBLE EN ESCRITORIO */}
                        <div className="video-wrapper">
                            <ReactPlayer
                                url="https://www.youtube.com/watch?v=UycU0OEjMvE"
                                playing={true}
                                muted={true}
                                loop={true}
                                controls={false}
                                width="100%"
                                height="100%"
                                className="react-player"
                                config={{
                                    youtube: {
                                        playerVars: {
                                            modestbranding: 1,
                                            showinfo: 0,
                                            rel: 0,
                                            start: 10,
                                            end: 501,
                                            fs: 0
                                        }
                                    }
                                }}
                            />
                            <div className="video-overlay" />
                            <div className="imagen-fondo-movil" />
                        </div>
                        <div className="about-overlay-text">
                            <h1>Selecciona una ciudad para ir al evento</h1>
                            <p>Tu ciudad. Tu energía. Tu evento.</p>
                            <p>Vive la experiencia completa en cada rincón del país.</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="detalle-direccion">
                    <h2>{data.nombre}</h2>
                    <h3>{data.descripcion}</h3>

                    <div className="detalle-grid">
                        <img
                            src={`/${data.imagen}`}
                            alt={`Imagen de ${data.nombre}`}
                            className="imagen-lugar"
                        />
                        <div className="mapa-container">
                            <Mapa
                                markers={[
                                    {
                                        id: 1,
                                        name: data.nombre,
                                        position: { lat: data.lat, lng: data.lng },
                                        descripcion: data.descripcion
                                    }
                                ]}
                                center={{ lat: data.lat, lng: data.lng }}
                            />
                        </div>
                    </div>

                    <div className="info-extra mt-3">
                        <p>
                            <strong>Hora del evento:</strong> {data.hora}
                        </p>
                        <p>
                            <strong>Asistentes:</strong> {data.asistentes}
                        </p>
                        <p>
                            <strong>Fecha:</strong>{" "}
                            {new Date(data.fechaISO).toLocaleDateString("es-ES", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}
                        </p>
                    </div>

                    <div className="temporizador">
                        <h4>Cuenta atrás para el evento</h4>
                        <CountdownTimer key={data.fechaISO} targetDate={data.fechaISO} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Eventos;
