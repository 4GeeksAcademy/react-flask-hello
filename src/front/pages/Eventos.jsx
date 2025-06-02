import React, { useState } from "react";
import "../../styles/eventos.css";

const Eventos = () => {
    const lugares = [
        {
            nombre: "Barcelona",
            descripcion: "Parque de la Ciutadella",
            imagen: "barcelona.jpg",
            iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5986.707175819499!2d2.1811442902344687!3d41.38812692195783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2fd439609e1%3A0x42386118e65a3d70!2sParque%20de%20la%20Ciutadella!5e0!3m2!1ses!2ses!4v1748606001707!5m2!1ses!2ses",
            hora: "18:00",
            asistentes: "100 personas"
        },
        {
            nombre: "Madrid",
            descripcion: "Parque el Retiro",
            imagen: "retiro.jpg",
            iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6075.421154970314!2d-3.6883366100251416!3d40.41526198209883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42289ff511827b%3A0x9e6c2716b524a3ae!2sParque%20de%20El%20Retiro!5e0!3m2!1ses!2ses!4v1748607187920!5m2!1ses!2ses",
            hora: "18:00",
            asistentes: "80 personas"
        },
        {
            nombre: "Caceres",
            descripcion: "Parque el Principe",
            imagen: "principe.jpg",
            iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.8030298074705!2d-6.3863123235273305!3d39.47377831248943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd15dfdf444bd553%3A0x158767137404fe84!2sParque%20del%20Pr%C3%ADncipe%2C%20Oeste%2C%2010001%20C%C3%A1ceres!5e0!3m2!1ses!2ses!4v1748607254192!5m2!1ses!2ses",
            hora: "18:00",
            asistentes: "20 personas"
        },
        {
            nombre: "Talavera de la Reina",
            descripcion: "Parque la Alameda",
            imagen: "talavera.jpg",
            iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.196204791961!2d-4.825919966362441!3d39.95936579300514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd401c096e146bcd%3A0xc3af6510c96b431f!2sParque%20de%20la%20Alameda!5e0!3m2!1ses!2ses!4v1748607123097!5m2!1ses!2ses",
            hora: "18:00",
            asistentes: "15 personas"
        },
        {
            nombre: "Sevilla",
            descripcion: "Parque de María Luisa",
            imagen: "sevilla.jpg",
            iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6341.280987802762!2d-5.9922984878047885!3d37.37468261158388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126c241d1a35ef%3A0x68b6f2f07d1ee842!2sParque%20de%20Mar%C3%ADa%20Luisa!5e0!3m2!1ses!2ses!4v1748607343664!5m2!1ses!2ses",
            hora: "18:00",
            asistentes: "148 personas"
        },
        {
            nombre: "Madrid",
            descripcion: "Parque el Palacio de Cristal",
            imagen: "palacio.jpg",
            iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2148.688878194321!2d-3.7018682265743466!3d40.393231363070655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4227005f2114dd%3A0x95704ac6b3a69889!2sPalacio%20de%20Cristal!5e0!3m2!1ses!2ses!4v1748607603192!5m2!1ses!2ses",
            hora: "18:00",
            asistentes: "189 personas"
        },
    ];

    const [data, setData] = useState(null);

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
                <div className="detalle-direccion">
                    <h2 className="titulo-eventos mb-4">Selecciona una ciudad para ir al evento</h2>
                    <img
                        src="parque.jpg"
                        alt="Imagen por defecto"
                        className="default"
                    />
                </div>
            ) : (
                <div className="detalle-direccion">
                    <h2>{data.nombre}</h2>
                    <img
                        src={data.imagen}
                        alt={`Imagen de ${data.nombre}`}
                        className="imagen-lugar"
                    />
                    <h3>{data.descripcion}</h3>

                    <div className="row">
                    <div className="info-extra">
                            <p><strong>Hora del evento:</strong> {data.hora}</p>
                            <p className="ms-5"><strong>Asistentes:</strong> {data.asistentes}</p>
                        </div>
                    </div>

                    {data.iframe && (
                        <div className="iframe-container mt-3">
                            <iframe
                                src={data.iframe}
                                width="100%"
                                height="500"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Mapa de ${data.nombre}`}
                            ></iframe>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default Eventos;

