import React from "react";
import { Link } from "react-router-dom";
import "./ClientList.css";

export const ClientList = ({ search }) => {
    const [clients, setClients] = React.useState([])

    const filteredClientes = clients.filter(
        (client) =>
            client.nombre.toLowerCase().includes(search.toLowerCase()) ||
            client.cliente_dni.includes(search)
    );

    return (
        <div className="clients-container">
            <h2 className="clients-title">Lista de Clientes</h2>

            {filteredClientes.length > 0 ? (
                <div className="clients-grid">
                    {filteredClientes.map((client) => (
                        <Link
                            key={client.id}
                            to={`/cliente/${client.id}`}
                            className="client-card-link"
                        >
                            <div className="client-card">
                                <div className="client-header">
                                    <h3 className="client-name">
                                        {client.nombre} {client.apellido}
                                    </h3>
                                    <span className="client-dni">DNI: {client.cliente_dni}</span>
                                </div>
                                <div className="client-info">
                                    <div className="info-item">
                                        <i className="info-icon fas fa-phone"></i>
                                        <span>{client.telefono}</span>
                                    </div>
                                    <div className="info-item">
                                        <i className="info-icon fas fa-envelope"></i>
                                        <span>{client.email}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="no-results">
                    <p>No se encontraron clientes.</p>
                </div>
            )}
        </div>
    );
};