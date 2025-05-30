import React, { useState } from "react";
import "../../styles/eventos.css";

const Eventos = () => {
    const lugares = [
        {
            nombre: "Dirección 1",
            descripcion: "Bienvenidos a Dirección 1",
            imagen: "https://picsum.photos/200"
        },
        {
            nombre: "Dirección 2",
            descripcion: "Bienvenidos a Dirección 2",
            imagen: "https://picsum.photos/200"
        },
        {
            nombre: "Dirección 3",
            descripcion: "Bienvenidos a Dirección 3",
            imagen: "https://picsum.photos/200"
        },
        {
            nombre: "Dirección 4",
            descripcion: "Bienvenidos a Dirección 4",
            imagen: "https://picsum.photos/200"
        },
        {
            nombre: "Dirección 5",
            descripcion: "Bienvenidos a Dirección 5",
            imagen: "https://picsum.photos/200"
        },
        {
            nombre: "Dirección 6",
            descripcion: "Bienvenidos a Dirección 6",
            imagen: "https://picsum.photos/200"
        },
    ];

    const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);

    return (
        <div className="eventos-container">
            <h1 className="titulo-eventos">Eventos activos</h1>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mapa_mudo_de_España.png/800px-Mapa_mudo_de_España.png"
                alt="Mapa de eventos"
                className="mapa-img"
            />

            {/* Lista de direcciones */}
            <div className="grid-direcciones">
                {lugares.map((lugar, idx) => (
                    <div
                        key={idx}
                        onClick={() => setDireccionSeleccionada(lugar)}
                        className="direccion-item"
                    >
                        {lugar.nombre}
                    </div>
                ))}
            </div>

            {/* Info de dirección seleccionada */}
            {direccionSeleccionada && (
                <div className="detalle-direccion">
                    <h2>Descripción ({direccionSeleccionada.nombre})</h2>
                    <img
                        src={direccionSeleccionada.imagen}
                        alt={`Imagen de ${direccionSeleccionada.nombre}`}
                        className="imagen-lugar"
                    />
                    <h3>{direccionSeleccionada.descripcion}</h3>
                    <p className="texto-bienvenida">
                        LOREM LOREM LOREM LOREM LOREM LOREM LOREM LOREM LOREM LOREM LOREM LOREM
                        LOREM LOREM LOREM LOREM LOREM LOREM LOREM LOREM
                    </p>
                </div>
            )}
        </div>
    );
};

export default Eventos;

