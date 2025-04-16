import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import "./ClientDetail.css";

export const ClientDetail = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const { token, selectedBusiness } = store;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

    const [client, setClient] = useState(null);
    const [clientServices, setClientServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notes, setNotes] = useState([]);
    const [activeService, setActiveService] = useState(null);

    // Modal states para notas
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [newNote, setNewNote] = useState("");
    const [notesLoading, setNotesLoading] = useState(false);
    const [noteError, setNoteError] = useState(null);

    // Modal states para servicios
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [availableServices, setAvailableServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(false);
    const [serviceError, setServiceError] = useState(null);

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
        if (!clientId) return;

        setNotesLoading(true);
        setNoteError(null);

        try {
            const response = await fetch(`${backendUrl}api/notes/${clientId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Ordenamos las notas por fecha (las más recientes primero)
                const sortedNotes = Array.isArray(data) ?
                    [...data].sort((a, b) => new Date(b.created_at || Date.now()) - new Date(a.created_at || Date.now()))
                    : [];
                setNotes(sortedNotes);
            } else {
                // Si recibimos un 404, significa que no hay notas, lo cual es OK
                if (response.status === 404) {
                    setNotes([]);
                } else {
                    setNoteError(data.error || data.msg || 'Error al cargar las notas');
                }
            }
        } catch (error) {
            console.error("Error fetching client notes:", error);
            setNoteError("Error de conexión al cargar las notas");
        } finally {
            setNotesLoading(false);
        }
    };


    const fetchAvailableServices = async () => {
        if (!selectedBusiness) {
            setServiceError("No business selected");
            return;
        }

        setServicesLoading(true);
        setServiceError(null);

        try {
            // Log the request URL for debugging
            const requestUrl = `${backendUrl}api/business/${selectedBusiness.id}/services`;
            console.log("Fetching services from:", requestUrl);

            const response = await fetch(requestUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Log response status
            console.log("Response status:", response.status);

            // If not OK, try to get more diagnostic info
            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                console.log("Response content type:", contentType);

                // If it's HTML, get text and log part of it
                if (contentType && contentType.includes("text/html")) {
                    const htmlText = await response.text();
                    console.error("Received HTML instead of JSON:", htmlText.substring(0, 200) + "...");
                    throw new Error(`Server returned HTML (${response.status}) instead of JSON. Check server logs.`);
                }

                // Try to parse as JSON anyway
                const errorData = await response.json().catch(e => ({ error: "Could not parse error response" }));
                throw new Error(errorData.error || `Server error: ${response.status}`);
            }

            const data = await response.json();

            // Ensure data is an array
            if (!Array.isArray(data)) {
                console.error("Expected array but got:", data);
                throw new Error("Response is not in the expected format (array)");
            }

            // Filter the services that the client already has assigned
            const clientServiceIds = clientServices.map(service => service.id);
            const filteredServices = data.filter(service => !clientServiceIds.includes(service.id));

            setAvailableServices(filteredServices);
            // Initially, no service is selected
            setSelectedServices([]);
        } catch (error) {
            console.error("Error fetching available services:", error);
            setServiceError(error.message);
        } finally {
            setServicesLoading(false);
        }
    };

    const handleEditAppointment = () => {
        if (activeService) {
            navigate(`/appointment/edit/${activeService.id}`);
        }
    };

    const handleViewBudget = () => {
        navigate(`/client/${clientId}/budget`);
    };

    // Functions para el modal de notas
    const openNoteModal = () => {
        setShowNoteModal(true);
        setNoteError(null);
    };

    const closeNoteModal = () => {
        setShowNoteModal(false);
        setNewNote("");
        setNoteError(null);
    };

    const addNewNote = async () => {
        if (newNote.trim() === "") {
            setNoteError("La nota no puede estar vacía");
            return;
        }

        setNotesLoading(true);
        setNoteError(null);

        try {
            // Verificamos que tenemos el email del cliente
            if (!client || !client.email) {
                throw new Error("No se encontró información del cliente");
            }

            const response = await fetch(`${backendUrl}api/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    client_email: client.email,
                    description: newNote
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.msg || "Error al guardar la nota");
            }

            // Actualizar la lista de notas
            await fetchClientNotes();
            closeNoteModal();
        } catch (error) {
            console.error("Error adding note:", error);
            setNoteError(error.message);
        } finally {
            setNotesLoading(false);
        }
    };

    // Función para eliminar una nota
    const deleteNote = async (noteId) => {
        if (!confirm("¿Estás seguro de que deseas eliminar esta nota?")) {
            return;
        }

        try {
            const response = await fetch(`${backendUrl}api/notes/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || data.msg || "Error al eliminar la nota");
            }

            // Actualizar la lista de notas
            fetchClientNotes();
        } catch (error) {
            console.error("Error deleting note:", error);
            alert(`Error: ${error.message}`);
        }
    };

    // Functions para el modal de servicios
    const openServiceModal = () => {
        setShowServiceModal(true);
        setServiceError(null);
        fetchAvailableServices();
    };

    const closeServiceModal = () => {
        setShowServiceModal(false);
        setSelectedServices([]);
        setServiceError(null);
    };

    // Función para manejar la selección de servicios
    const handleServiceSelection = (serviceId) => {
        if (selectedServices.includes(serviceId)) {
            setSelectedServices(selectedServices.filter(id => id !== serviceId));
        } else {
            setSelectedServices([...selectedServices, serviceId]);
        }
    };

    // Función para asignar los servicios seleccionados al cliente
    const assignServicesToClient = async () => {
        if (selectedServices.length === 0) {
            setServiceError("Debes seleccionar al menos un servicio");
            return;
        }

        setServicesLoading(true);
        setServiceError(null);

        try {
            const response = await fetch(`${backendUrl}api/clients/${clientId}/services`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    service_ids: selectedServices
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.msg || "Error al asignar servicios");
            }

            // Actualizar la lista de servicios del cliente
            await fetchClientServices();
            closeServiceModal();
        } catch (error) {
            console.error("Error assigning services:", error);
            setServiceError(error.message);
        } finally {
            setServicesLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="client-detail-container">
                <div className="loading">Loading customer information...</div>
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
                    <p>Client not found</p>
                    <button onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="all">
            <div className="container">
                <div className="client-detail-container">
                    <div className="back-button">
                        <button onClick={() => navigate(-1)}>
                            <i className="fas fa-arrow-left"></i> Back
                        </button>
                    </div>

                    {/* informacion principal cliente */}
                    <div className="client-header">
                        <div className="client-info-main">
                            <h1>{client.name}</h1>
                            <div className="client-id">DNI: {client.client_id_number}</div>
                        </div>
                    </div>

                    <div className="client-details-grid">
                        {/*  información personal */}
                        <div className="client-info-section">
                            <h2>Personal Information</h2>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Direcction:</span>
                                    <span className="info-value">{client.address || "No disponible"}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Phone:</span>
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
                                <button className="add-note-button" onClick={openNoteModal}>
                                    <i className="fas fa-plus"></i> Add nota
                                </button>
                            </div>

                            <div className="notes-list">
                                {notesLoading ? (
                                    <div className="notes-loading">Cargando notas...</div>
                                ) : noteError ? (
                                    <div className="notes-error">{noteError}</div>
                                ) : notes.length > 0 ? (
                                    notes.map(note => (
                                        <div key={note.id} className="note-item">
                                            <div className="note-header">
                                                <div className="note-date">
                                                    {new Date(note.created_at || Date.now()).toLocaleDateString()}
                                                </div>
                                                <button
                                                    className="delete-note-button"
                                                    onClick={() => deleteNote(note.id)}
                                                    title="Eliminar nota"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                            <div className="note-text">{note.description}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-notes">There are no notes recorded</div>
                                )}
                            </div>
                        </div>

                        {/* servicio activo */}
                        <div className="active-service-section">
                            <h2>Active service</h2>

                            {activeService ? (
                                <div className="active-service-info">
                                    <div className="service-name">{activeService.name}</div>
                                    <div className="service-detail">
                                        <span className="detail-label">Description:</span>
                                        <span className="detail-value">{activeService.description || "No disponible"}</span>
                                    </div>
                                    <div className="service-detail">
                                        <span className="detail-label">Price:</span>
                                        <span className="detail-value">${activeService.price || "N/A"}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="no-active-service">
                                    <p>There are no active services</p>
                                    <button className="add-service-button" onClick={openServiceModal}>
                                        <i className="fas fa-plus"></i> Add service
                                    </button>
                                </div>
                            )}

                            {activeService && (
                                <div className="service-actions">
                                    <button className="add-service-button" onClick={openServiceModal}>
                                        <i className="fas fa-plus"></i> Add another service
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="action-buttons">
                        <Link to={`/client/${clientId}/service-history`} className="action-button history-button">
                            <i className="fas fa-history"></i>
                            <span>Service history</span>
                        </Link>

                        <button
                            onClick={handleEditAppointment}
                            className="action-button edit-appointment-button"
                            disabled={!activeService}
                        >
                            <i className="fas fa-calendar-alt"></i>
                            <span>Modify appointment</span>
                        </button>

                        <button
                            onClick={handleViewBudget}
                            className="action-button budget-button"
                        >
                            <i className="fas fa-file-invoice-dollar"></i>
                            <span>See budget</span>
                        </button>
                    </div>

                    {/* Modal para agregar notas */}
                    {showNoteModal && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3>Add New Note</h3>
                                    <button className="close-button" onClick={closeNoteModal}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {noteError && (
                                        <div className="note-error-message">{noteError}</div>
                                    )}
                                    <textarea
                                        placeholder="Write your note here..."
                                        value={newNote}
                                        onChange={(e) => setNewNote(e.target.value)}
                                        rows={4}
                                        disabled={notesLoading}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        className="cancel-button"
                                        onClick={closeNoteModal}
                                        disabled={notesLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="save-button"
                                        onClick={addNewNote}
                                        disabled={notesLoading}
                                    >
                                        {notesLoading ? "Saving..." : "Save Note"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal para agregar servicios */}
                    {showServiceModal && (
                        <div className="modal-overlay">
                            <div className="modal-content service-modal">
                                <div className="modal-header">
                                    <h3>Add Services</h3>
                                    <button className="close-button" onClick={closeServiceModal}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {serviceError && (
                                        <div className="service-error-message">{serviceError}</div>
                                    )}

                                    {servicesLoading ? (
                                        <div className="services-loading">Loading available services...</div>
                                    ) : (
                                        <>
                                            {availableServices.length === 0 ? (
                                                <div className="no-services-message">
                                                    There are no services available to assign to this client.
                                                </div>
                                            ) : (
                                                <div className="services-list">
                                                    {availableServices.map(service => (
                                                        <div key={service.id} className="service-option">
                                                            <label className="service-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedServices.includes(service.id)}
                                                                    onChange={() => handleServiceSelection(service.id)}
                                                                />
                                                                <div className="service-info">
                                                                    <span className="service-name">{service.name}</span>
                                                                    <span className="service-price">${service.price}</span>
                                                                </div>
                                                            </label>
                                                            <div className="service-description">
                                                                {service.description}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button
                                        className="cancel-button"
                                        onClick={closeServiceModal}
                                        disabled={servicesLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="save-button"
                                        onClick={assignServicesToClient}
                                        disabled={servicesLoading || availableServices.length === 0 || selectedServices.length === 0}
                                    >
                                        {servicesLoading ? "Assigning..." : "Assign Services"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};