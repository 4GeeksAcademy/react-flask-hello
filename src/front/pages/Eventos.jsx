import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useJsApiLoader } from "@react-google-maps/api";
import "../../styles/eventos.css";
import Mapa from "../components/Mapa.jsx";

function Eventos() {
    const lugares = [
        {
            nombre: "Barcelona",
            descripcion: "Parque de la Ciutadella",
            imagen: "barcelona.jpg",
            lat: 41.3881,
            lng: 2.1811,
            hora: "18:00",
            asistentes: "100 personas"
        },
        {
            nombre: "Madrid",
            descripcion: "Parque del Retiro",
            imagen: "retiro.jpg",
            lat: 40.411766,
            lng: -3.687116,
            hora: "18:00",
            asistentes: "80 personas"
        },
        {
            nombre: "Cáceres",
            descripcion: "Parque del Príncipe",
            imagen: "principe.jpg",
            lat: 39.473704,
            lng: -6.383523,
            hora: "18:00",
            asistentes: "40 personas"
        },
        {
            nombre: "Talavera de la Reina",
            descripcion: "Parque la Alameda",
            imagen: "talavera.jpg",
            lat: 39.959866,
            lng: -4.821326,
            hora: "18:00",
            asistentes: "45 personas"
        },
        {
            nombre: "Sevilla",
            descripcion: "Parque de María Luisa",
            imagen: "sevilla.jpg",
            lat: 37.375817,
            lng: -5.987878,
            hora: "18:00",
            asistentes: "163 personas"
        },
        {
            nombre: "Madrid",
            descripcion: "Parque el Palacio de Cristal",
            imagen: "palacio.jpg",
            lat: 40.39237,
            lng: -3.700065,
            hora: "18:00",
            asistentes: "188 personas"
        }
    ];
    const [data, setData] = useState(null);
    console.log(data);

    return (
        <div className="eventos-container">
            <h1 className="titulo-eventos">Eventos activos</h1>
            <div className="grid-direcciones">
                {lugares.map((lugar, i) => (
                    <div
                        key={i}
                        onClick={() => setData(lugar)}
                        className="direccion-item"
                    >
                        {lugar.descripcion}
                    </div>
                ))}
            </div>
            {!data ? (
                <div className="row">
                    <div className="col-md-12">
                        <div className="video-wrapper">
                            <ReactPlayer
                                url="https://www.youtube.com/watch?v=UycU0OEjMvE"
                                playing={true}
                                muted={true}
                                loop={true}
                                controls={false}
                                width="100%"
                                height="1200px"
                                style={{ objectFit: 'cover' }}
                                config={{
                                    youtube: {
                                        playerVars: {
                                            modestbranding: 1,
                                            showinfo: 0,
                                            rel: 0, start: 10,
                                            end: 501
                                        }
                                    }
                                }}
                            />
                            <div className="video-overlay" />
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
                    {data.imagen && (
                        <img
                            src={`/${data.imagen}`}
                            alt={`Imagen de ${data.nombre}`}
                            className="imagen-lugar"
                        />
                    )}
                    <h3>{data.descripcion}</h3>
                    <div className="row">
                        <div className="info-extra">
                            <p><strong>Hora del evento:</strong> {data.hora}</p>
                            <p className="ms-5"><strong>Asistentes:</strong> {data.asistentes}</p>
                        </div>
                    </div>

                    {data && (
                        <div className="mapa-container mt-3">
                            <Mapa
                                markers={[
                                    {
                                        id: 1,
                                        name: data.nombre,
                                        position: { lat: data.lat, lng: data.lng },
                                        descripcion: data.descripcion,
                                    },
                                ]}
                                center={{ lat: data.lat, lng: data.lng }}
                            />
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}
export default Eventos;