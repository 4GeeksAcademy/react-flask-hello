import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userServices from "../../services/userServices";
import "../../styles/usuarioPage.css";

const UsuarioPage = () => {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        userServices.getUserById(id).then((res) => {
            if (res && res.success !== false) setUsuario(res);
        });
    }, [id]);

    if (!usuario) return <p>Cargando usuario...</p>;

    return (
        <div className="usuario-page">
            <div className="usuario-header">
                <h2>{usuario?.nombre || "Perfil de Usuario"}</h2>
            </div>


            <div className="usuario-principal">
                <div className="usuario-columna">
                    <p><strong>Email:</strong> {usuario.email || "No disponible"}</p>
                    <p><strong>Teléfono:</strong> {usuario.telefono || "No disponible"}</p>
                </div>

                <div className="usuario-columna usuario-centro">
                    <p className="usuario-nombre">{usuario.nombre || "Nombre desconocido"}</p>
                    <img
                        src={usuario.imagen || "/logoCrema1.png"}
                        alt="Avatar"
                        className="usuario-avatar"
                    />
                </div>

                <div className="usuario-columna">
                    <p><strong>Objetivo:</strong> {usuario.objetivo || "Sin definir"}</p>
                    <p><strong>Sexo:</strong> {usuario.sexo || "No especificado"}</p>
                </div>
            </div>

            <div className="usuario-datos-secundarios">
                <p><strong>Altura:</strong> {usuario.altura ? `${usuario.altura} cm` : "No disponible"}</p>
                <p><strong>Peso:</strong> {usuario.peso ? `${usuario.peso} kg` : "No disponible"}</p>
            </div>
        </div>
    );
};

export default UsuarioPage;
