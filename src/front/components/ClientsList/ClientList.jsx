import React from "react";
import { Link } from "react-router-dom";
import "./ClientList.css";
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const ClientList = ({ search }) => {
    const { store } = useGlobalReducer();
    const { clients, selectedBusiness } = store;
    
    if (!Array.isArray(clients) || clients.length === 0) {
        return (
            <div className="clients-list">
                <h2 className="clients-title">Client List</h2>
                <div className="no-results">
                    <p>There are no customers yet.</p>
                </div>
            </div>
        );
    }
    
    const filteredClients = clients.filter(client => {

        if (!client || typeof client !== 'object') {
            return false;
        }
        

        const matchesSearch = search.trim() === '' || 
            (client.name && client.name.toLowerCase().includes(search.toLowerCase())) ||
            (client.client_id_number && client.client_id_number.includes(search));

        const matchesBusiness = !selectedBusiness || client.business_id === null || 
            String(client.business_id) === String(selectedBusiness.id);
            
        return matchesSearch && matchesBusiness;
    });

    return (
        <div className="clients-list">
            <h2 className="clients-title">Client List</h2>

            {filteredClients.length > 0 ? (
                <div className="clients-grid">
                    {filteredClients.map((client) => (
                        <Link
                            key={client.id}
                            to={`/clients/${client.id}`}
                            className="client-card-link"
                        >
                            <div className="client-card">
                                <div className="client-header">
                                    <h3 className="client-name">
                                        {client.name}
                                    </h3>
                                    <span className="client-dni">ID: {client.client_id_number}</span>
                                </div>
                                <div className="client-info">
                                    <div className="info-item">
                                        <i className="info-icon fas fa-phone"></i>
                                        <span>{client.phone || 'N/A'}</span>
                                    </div>
                                    <div className="info-item">
                                        <i className="info-icon fas fa-envelope"></i>
                                        <span>{client.email || 'N/A'}</span>
                                    </div>
                                    <div className="info-item">
                                        <i className="info-icon fas fa-map-marker-alt"></i>
                                        <span>{client.address || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="no-results">
                    <p>No clients match your search criteria.</p>
                </div>
            )}
        </div>
    );
};