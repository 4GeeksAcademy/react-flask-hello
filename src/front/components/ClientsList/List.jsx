import React from "react";
import { Link } from "react-router-dom";
import "./List.css"; 

export const ClientesList = ({ search }) => {
    const [clientes, setClientes] = React.useState([
        {
            id: 1,
            nombre: "Juan",
            apellido: "Pérez",
            cliente_dni: "12345678",
            telefono: "555-1234",
            email: "juan.perez@example.com",
        },
        {
            id: 2,
            nombre: "María",
            apellido: "González",
            cliente_dni: "87654321",
            telefono: "555-5678",
            email: "maria.gonzalez@example.com",
        },
        {
            id: 3,
            nombre: "Carlos",
            apellido: "López",
            cliente_dni: "45678912",
            telefono: "555-9876",
            email: "carlos.lopez@example.com",
        },
    ]);

    const filteredClientes = clientes.filter(
        (cliente) =>
            cliente.nombre.toLowerCase().includes(search.toLowerCase()) ||
            cliente.cliente_dni.includes(search)
    );

    return (
        <div className="clients-container">
            <h2 className="clients-title">Lista de Clientes</h2>
            
            {filteredClientes.length > 0 ? (
                <div className="clients-grid">
                    {filteredClientes.map((cliente) => (
                        <Link 
                            key={cliente.id} 
                            to={`/cliente/${cliente.id}`} 
                            className="client-card-link"
                        >
                            <div className="client-card">
                                <div className="client-header">
                                    <h3 className="client-name">
                                        {cliente.nombre} {cliente.apellido}
                                    </h3>
                                    <span className="client-dni">DNI: {cliente.cliente_dni}</span>
                                </div>
                                <div className="client-info">
                                    <div className="info-item">
                                        <i className="info-icon phone-icon"></i>
                                        <span>{cliente.telefono}</span>
                                    </div>
                                    <div className="info-item">
                                        <i className="info-icon email-icon"></i>
                                        <span>{cliente.email}</span>
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