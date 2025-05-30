import React, { useState } from "react";
import "../../styles/eventos.css";

const Eventos = () => {
    const lugares = [
        {
            nombre: "Dirección 1",
            descripcion: "Bienvenidos a Dirección 1",
            imagen: "https://via.placeholder.com/600x200?text=Direccion+1"
        },
        {
            nombre: "Dirección 7",
            descripcion: "Bienvenidos a Dirección 7",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Retiro_-_Palacio_de_Cristal_02.jpg/800px-Retiro_-_Palacio_de_Cristal_02.jpg"
        },
        {
            nombre: "Dirección 15",
            descripcion: "Bienvenidos a Dirección 15",
            imagen: "https://via.placeholder.com/600x200?text=Direccion+15"
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

