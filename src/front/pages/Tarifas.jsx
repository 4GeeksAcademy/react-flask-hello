import React, { useState } from "react";
import "../../styles/tarifas.css";

const Tarifas = () => {
    const opciones = [
        {
            nombre: "Tarifa Basic",
            descripcion:
                "Ideal para quienes quieren empezar a moverse. Incluye planes básicos de entrenamiento con tablas de ejercicios estructuradas para todos los niveles.",
            imagenes: [
                "https://img.freepik.com/foto-gratis/peso-saludable-cuidado-masculino-atletico_1139-695.jpg?uid=R94462527&ga=GA1.1.2118358263.1748545776&semt=ais_hybrid&w=740"
            ]
        },
        {
            nombre: "Tarifa Premium",
            descripcion:
                "Pensada para quienes buscan un acompañamiento real. Incluye planes de entrenamiento guiados por un entrenador o asesoramiento nutricional personalizado con un nutricionista profesional.",
            imagenes: [
                "https://img.freepik.com/foto-gratis/mujer-joven-cinta-metrica-cocina_1303-24778.jpg?uid=R94462527&ga=GA1.1.2118358263.1748545776&semt=ais_hybrid&w=740",
                "https://img.freepik.com/foto-gratis/pareja-gimnasio_1303-5541.jpg?uid=R94462527&ga=GA1.1.2118358263.1748545776&semt=ais_hybrid&w=740"
            ]
        },
        {
            nombre: "Tarifa DMPC",
            descripcion:
                "La experiencia completa. Accede a todos los planes de entrenamiento y nutrición, con seguimiento personalizado por parte de nuestro equipo de expertos. Todo en uno, sin límites.",
            imagenes: [
                "https://img.freepik.com/foto-gratis/mujeres-comida-saludable-tiro-medio_23-2149894948.jpg?uid=R94462527&ga=GA1.1.2118358263.1748545776&semt=ais_hybrid&w=740"
            ]
        }
    ];

    const [eleccionSeleccionada, setEleccionSeleccionada] = useState(null);

    return (
        <div className="tarifas-container">
            <h1 className="titulo-tarifas">Tarifas</h1>

            {/* Lista de tarifas */}
            <div className="grid-opciones">
                {opciones.map((titulo, idx) => (
                    <div
                        key={idx}
                        onClick={() => setEleccionSeleccionada(titulo)}
                        className="opciones-item"
                    >
                        {titulo.nombre}
                    </div>
                ))}
            </div>

            {/* Detalle de la tarifa seleccionada */}
            {eleccionSeleccionada && (
                <div className="detalle-opciones">
                    <h2>{eleccionSeleccionada.nombre}</h2>

                    <div className="imagenes-grid">
                        {eleccionSeleccionada.imagenes.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`Imagen ${i + 1} de ${eleccionSeleccionada.nombre}`}
                            />
                        ))}
                    </div>

                    <h3>{eleccionSeleccionada.descripcion}</h3>
                </div>
            )}
        </div>
    );
};


export default Tarifas;

