import React from "react";
import { Link } from "react-router-dom";
import "./List.css";

export const ClientList = ({ search }) => {
    const [clients, setClients] = React.useState([
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

        {
            id: 4,
            nombre: "Ana",
            apellido: "Martínez",
            cliente_dni: "56781234",
            telefono: "555-4321",
            email: "ana.martinez@example.com",
        },
        {
            id: 5,
            nombre: "Pedro",
            apellido: "Rodríguez",
            cliente_dni: "34567891",
            telefono: "555-8765",
            email: "pedro.rodriguez@example.com",
        },
        {
            id: 6,
            nombre: "Laura",
            apellido: "Sánchez",
            cliente_dni: "23456789",
            telefono: "555-2345",
            email: "laura.sanchez@example.com",
        },
        {
            id: 7,
            nombre: "Miguel",
            apellido: "Fernández",
            cliente_dni: "98765432",
            telefono: "555-6789",
            email: "miguel.fernandez@example.com",
        },
        {
            id: 8,
            nombre: "Sofía",
            apellido: "Torres",
            cliente_dni: "87612345",
            telefono: "555-3456",
            email: "sofia.torres@example.com",
        },
        {
            id: 9,
            nombre: "Javier",
            apellido: "Díaz",
            cliente_dni: "65432198",
            telefono: "555-7890",
            email: "javier.diaz@example.com",
        },
        {
            id: 10,
            nombre: "Carmen",
            apellido: "Ruiz",
            cliente_dni: "54321678",
            telefono: "555-0123",
            email: "carmen.ruiz@example.com",
        },
        {
            id: 11,
            nombre: "Daniel",
            apellido: "Gómez",
            cliente_dni: "43219876",
            telefono: "555-4567",
            email: "daniel.gomez@example.com",
        },
        {
            id: 12,
            nombre: "Elena",
            apellido: "Moreno",
            cliente_dni: "32198765",
            telefono: "555-8901",
            email: "elena.moreno@example.com",
        },
     
    ]);

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