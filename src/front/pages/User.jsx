import React from "react";
import "../../styles/User.css";

const User = () => {
    const usuario = {
        nombre: "Susana",
        apellidos: "Susanita",
        email: "susanita98@example.com",
        telefono: "+34 600 123 456",
        direccion: "Calle Ficticia 123, Madrid",
        sexo: "Femenino",
        objetivo: "Ganar masa muscular",
        altura: 170,
        peso: 73,
        imagen: "https://i.pravatar.cc/200?u=david"
    };

    const entrenador = {
        nombre: "Pepe Strong",
        imagen: "https://randomuser.me/api/portraits/men/75.jpg"
    };

    const historial = [
        "Se apuntó al evento 'Yoga al aire libre' - 1 junio",
        "Entrenó fuerza en gimnasio - 30 mayo",
        "Asistió a clase de boxeo - 28 mayo"
    ];

    const membresia = {
        tipo: "Premium",
        duracion: "6 meses",
        inicio: "1 de mayo de 2025"
    };

    return (
        <div className="perfil-container">
            <h1 className="perfil-titulo">Perfil del Usuario</h1>

            <div className="perfil-card">
                <div className="columna columna-izquierda">
                    <p><strong>Nombre:</strong> {usuario.nombre}</p>
                    <p><strong>Apellidos:</strong> {usuario.apellidos}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                    <p><strong>Dirección:</strong> {usuario.direccion}</p>
                    <p><strong>Sexo:</strong> {usuario.sexo}</p>
                </div>

                <div className="columna columna-centro">
                    <img src={usuario.imagen} alt="Foto del usuario" />
                    <button className="btn-editar">Editar datos</button>
                </div>

                <div className="columna columna-derecha">
                    <p><strong>Objetivo:</strong> {usuario.objetivo}</p>
                    <p><strong>Altura:</strong> {usuario.altura} cm</p>
                    <p><strong>Peso:</strong> {usuario.peso} kg</p>
                </div>
            </div>

            {/* Secciones inferiores */}
            <div className="secciones-inferiores">
                <div className="seccion">
                    <h2>Entrenador</h2>
                    <img src={entrenador.imagen} alt="Entrenador" className="entrenador-img" />
                    <p className="entrenador-nombre">{entrenador.nombre}</p>
                </div>

                <div className="seccion">
                    <h2>Historial de Actividad</h2>
                    <ul>
                        {historial.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>

                <div className="seccion">
                    <h2>Membresía</h2>
                    <p><strong>Tipo:</strong> {membresia.tipo}</p>
                    <p><strong>Duración:</strong> {membresia.duracion}</p>
                    <p><strong>Inicio:</strong> {membresia.inicio}</p>
                </div>
            </div>
        </div>
    );
};

export default User;
