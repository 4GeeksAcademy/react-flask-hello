import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import "./ClientDetail.css";

export const ClientDetail = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const { token } = store;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
    
    const [client, setClient] = useState(null);
    const [clientServices, setClientServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notes, setNotes] = useState([]);
    const [activeService, setActiveService] = useState(null);

    useEffect(() => {
        if (token && clientId) {
            fetchClientData();
            fetchClientServices();
            fetchClientNotes();
        }
    }, [clientId, token]);

    const fetchClientData = async () => {
        try {
            const response = await fetch(`${backendUrl}api/clients/${clientId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Error cargando datos del cliente');
            }

            setClient(data);
            dispatch({
                type: "select_client",
                payload: data
            });
        } catch (error) {
            console.error("Error fetching client:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchClientServices = async () => {
        try {
            const response = await fetch(`${backendUrl}api/clients/${clientId}/services`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Error cargando servicios del cliente');
            }

            setClientServices(data);
            
            
            if (data && data.length > 0) {
                const sortedServices = [...data].sort((a, b) => 
                    new Date(b.created_at || 0) - new Date(a.created_at || 0)
                );
                setActiveService(sortedServices[0]);
            }
        } catch (error) {
            console.error("Error fetching client services:", error);
        }
    };

    const fetchClientNotes = async () => {
        //aqui pongo ejemplos de notas 
        setNotes([
            { id: 1, text: "Cliente frecuente, asiste puntualmente", date: "2023-05-15" },
            { id: 2, text: "Prefiere atención en horario matutino", date: "2023-06-22" }
        ]);
    };

    const handleEditAppointment = () => {
    
        if (activeService) {
            navigate(`/appointment/edit/${activeService.id}`);
        }
    };

    const handleViewBudget = () => {
        
        navigate(`/client/${clientId}/budget`);
    };

    if (loading) {
        return (
            <div className="client-detail-container">
                <div className="loading">Cargando información del cliente...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="client-detail-container">
                <div className="error-message">
                    <p>Error: {error}</p>
                    <button onClick={() => navigate(-1)}>Volver</button>
                </div>
            </div>
        );
    }

    if (!client) {
        return (
            <div className="client-detail-container">
                <div className="not-found">
                    <p>Cliente no encontrado</p>
                    <button onClick={() => navigate(-1)}>Volver</button>
                </div>
            </div>
        );
    }

    return (
        <div className="client-detail-container">
            <div className="back-button">
                <button onClick={() => navigate(-1)}>
                    <i className="fas fa-arrow-left"></i> Volver
                </button>
            </div>
            
            {/* informacion principal cliente */}
            <div className="client-header">
                <div className="client-info-main">
                    <h1>{client.name}</h1>
                    <div className="client-id">DNI: {client.client_id_number}</div>
                </div>
                <div className="client-actions">
                    <button className="edit-button">
                        <i className="fas fa-edit"></i> Editar
                    </button>
                </div>
            </div>
            
            <div className="client-details-grid">
                {/*  información personal */}
                <div className="client-info-section">
                    <h2>Información Personal</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Dirección:</span>
                            <span className="info-value">{client.address || "No disponible"}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Teléfono:</span>
                            <span className="info-value">{client.phone || "No disponible"}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Email:</span>
                            <span className="info-value">{client.email || "No disponible"}</span>
                        </div>
                    </div>
                </div>
                
                {/* notas */}
                <div className="client-notes-section">
                    <div className="section-header">
                        <h2>Notas</h2>
                        <button className="add-note-button">
                            <i className="fas fa-plus"></i> Agregar nota
                        </button>
                    </div>
                    
                    <div className="notes-list">
                        {notes.length > 0 ? (
                            notes.map(note => (
                                <div key={note.id} className="note-item">
                                    <div className="note-date">{new Date(note.date).toLocaleDateString()}</div>
                                    <div className="note-text">{note.text}</div>
                                </div>
                            ))
                        ) : (
                            <div className="no-notes">No hay notas registradas</div>
                        )}
                    </div>
                </div>
                
                {/* servicio activo */}
                <div className="active-service-section">
                    <h2>Servicio Activo</h2>
                    
                    {activeService ? (
                        <div className="active-service-info">
                            <div className="service-name">{activeService.name}</div>
                            <div className="service-detail">
                                <span className="detail-label">Descripción:</span>
                                <span className="detail-value">{activeService.description || "No disponible"}</span>
                            </div>
                            <div className="service-detail">
                                <span className="detail-label">Precio:</span>
                                <span className="detail-value">${activeService.price || "N/A"}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="no-active-service">
                            <p>No hay servicios activos</p>
                            <button className="add-service-button">
                                <i className="fas fa-plus"></i> Agregar servicio
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Botones de acción */}
            <div className="action-buttons">
                <Link to={`/client/${clientId}/service-history`} className="action-button history-button">
                    <i className="fas fa-history"></i>
                    <span>Historial de servicios</span>
                </Link>
                
                <button 
                    onClick={handleEditAppointment} 
                    className="action-button edit-appointment-button"
                    disabled={!activeService}
                >
                    <i className="fas fa-calendar-alt"></i>
                    <span>Modificar cita</span>
                </button>
                
                <button 
                    onClick={handleViewBudget} 
                    className="action-button budget-button"
                >
                    <i className="fas fa-file-invoice-dollar"></i>
                    <span>Ver presupuesto</span>
                </button>
            </div>
        </div>
    );
};