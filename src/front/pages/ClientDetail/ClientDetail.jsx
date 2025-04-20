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
    const businessId = selectedBusiness?.id;

    const [client, setClient] = useState(null);
    const [clientServices, setClientServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notes, setNotes] = useState([]);
    const [activeService, setActiveService] = useState(null);

    const [showNoteModal, setShowNoteModal] = useState(false);
    const [newNote, setNewNote] = useState("");
    const [notesLoading, setNotesLoading] = useState(false);
    const [noteError, setNoteError] = useState(null);

    const [showServiceModal, setShowServiceModal] = useState(false);
    const [availableServices, setAvailableServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(false);
    const [serviceError, setServiceError] = useState(null);

    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [completedServices, setCompletedServices] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [historyError, setHistoryError] = useState(null);

    useEffect(() => {
        if (token && clientId) {
            fetchClientData();
            fetchClientServices();
            fetchClientNotes();
        }
    }, [clientId, token]);

    useEffect(() => {
        if (token && clientId) {

            const loadCompletedServices = async () => {
                try {
                    setHistoryLoading(true);
                    const response = await fetch(`${backendUrl}api/clients/${clientId}/completed-services`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setCompletedServices(data);
                    }
                } catch (error) {
                    console.error("Error pre-loading completed services:", error);
                } finally {
                    setHistoryLoading(false);
                }
            };

            loadCompletedServices();
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
                throw new Error(data.error || 'Error loading client data');

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
                throw new Error(data.error || 'Error loading client services');
            }

            setClientServices(data);

            if (data && data.length > 0) {
                const sortedServices = [...data].sort((a, b) =>
                    new Date(b.created_at || 0) - new Date(a.created_at || 0)
                );
                setActiveService(sortedServices[0]);
            } else {
                setActiveService(null);

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
                const sortedNotes = Array.isArray(data) ?
                    [...data].sort((a, b) => new Date(b.created_at || Date.now()) - new Date(a.created_at || Date.now()))
                    : [];
                setNotes(sortedNotes);
            } else {
                if (response.status === 404) {
                    setNotes([]);
                } else {
                    setNoteError(data.error || data.msg || 'Error loading notes');
                }
            }
        } catch (error) {
            console.error("Error fetching client notes:", error);
            setNoteError("Connection error when loading notes");
        } finally {
            setNotesLoading(false);
        }
    };


    const fetchCompletedServices = async () => {
        if (!clientId || !token) return;

        if (historyLoading) {
            console.log("It is already loading services, avoiding new calls");
            return;
        }

        setHistoryLoading(true);
        setHistoryError(null);

        try {

            const response = await fetch(`${backendUrl}api/clients/${clientId}/completed-services`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error loading completed services');
            }

            const completedServicesData = await response.json();

            const sortedServices = completedServicesData.sort((a, b) => {
                const dateA = a.completed_date ? new Date(a.completed_date) : new Date(0);
                const dateB = b.completed_date ? new Date(b.completed_date) : new Date(0);
                return dateB - dateA;
            });

            setCompletedServices(sortedServices);
        } catch (error) {
            console.error("Error loading completed services:", error);
            setHistoryError("Error loading completed services");
        } finally {
            setHistoryLoading(false);
        }
    };

    const isServiceCompleted = (serviceId) => {
        return completedServices.some(service => service.id === serviceId);
    };

    const handleServiceDone = async (instanceId) => {
        try {
            const response = await fetch(`${backendUrl}api/service-instances/${instanceId}/complete`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || data.msg || "Error marking service as completed");
            }

            const data = await response.json();
            console.log("Service marked as completed:", data);

            const updatedClientServices = clientServices.filter(service =>
                service.instance_id !== instanceId
            );
            setClientServices(updatedClientServices);

            if (activeService && activeService.instance_id === instanceId) {
                if (updatedClientServices.length > 0) {
                    setActiveService(updatedClientServices[0]);
                } else {
                    setActiveService(null);
                }
            }

            if (showHistoryModal) {
                fetchCompletedServices();
            }

            alert("Service marked as completed successfully");
        } catch (error) {
            console.error("Error marking service as completed:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleServiceDelete = async (instanceId) => {
        if (!confirm("Are you sure you want to delete this service?")) {
            return;
        }

        try {
            const response = await fetch(`${backendUrl}api/service-instances/${instanceId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || data.msg || "Error deleting the service");
            }

            fetchClientServices();
        } catch (error) {
            console.error("Error deleting service:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const fetchAvailableServices = async () => {

        if (!businessId) {
            setServiceError("No business selected");
            return;
        }

        setServicesLoading(true);
        setServiceError(null);

        try {
            const requestUrl = `${backendUrl}api/business/${businessId}/services`;
            console.log("Request URL:", requestUrl);

            const response = await fetch(requestUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("Response received, status:", response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(e => ({ error: "Could not process response" }));
                throw new Error(errorData.error || `Server error: ${response.status}`);
            }

            const data = await response.json();
            console.log("Data received:", data);

            if (!Array.isArray(data)) {
                throw new Error("Response doesn't have the expected format (array)");
            }

            setAvailableServices(data);
            setSelectedServices([]);
        } catch (error) {
            console.error("Error fetching available services:", error);
            setServiceError(error.message);
        } finally {
            setServicesLoading(false);
        }
    };

    const handleCreateAppointment = () => {
        if (activeService) {
            navigate(`/appointment/create/${clientId}`);
        }
    };

    const openNoteModal = () => {
        setShowNoteModal(true);
        setNoteError(null);
        setNewNote("");
    };

    const closeNoteModal = () => {
        setShowNoteModal(false);
        setNewNote("");
        setNoteError(null);
    };

    const openHistoryModal = () => {
        setShowHistoryModal(true);
        fetchCompletedServices();
    };

    const closeHistoryModal = () => {
        setShowHistoryModal(false);
    };

    const addNewNote = async (noteText = null) => {
        const textToSave = noteText || newNote;

        if (textToSave.trim() === "") {
            setNoteError("Note cannot be empty");
            return;
        }

        setNotesLoading(true);
        setNoteError(null);

        try {
            if (!client || !client.email) {
                throw new Error("Client information not found");
            }

            const response = await fetch(`${backendUrl}api/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    client_email: client.email,
                    description: textToSave
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.msg || "Error saving the note");
            }

            await fetchClientNotes();
            closeNoteModal();
        } catch (error) {
            console.error("Error adding note:", error);
            setNoteError(error.message);
        } finally {
            setNotesLoading(false);
        }
    };

    const deleteNote = async (noteId) => {
        if (!confirm("Are you sure you want to delete this note?")) {
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
                throw new Error(data.error || data.msg || "Error deleting the note");
            }

            fetchClientNotes();
        } catch (error) {
            console.error("Error deleting note:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const openServiceModal = () => {
        setShowServiceModal(true);
        setServiceError(null);
    };

    const closeServiceModal = () => {
        setShowServiceModal(false);
        setSelectedServices([]);
        setServiceError(null);
    };

    useEffect(() => {
        if (showServiceModal) {
            fetchAvailableServices();
        }
    }, [showServiceModal]);

    const handleServiceSelection = (serviceId) => {
        if (selectedServices.includes(serviceId)) {
            setSelectedServices(selectedServices.filter(id => id !== serviceId));
        } else {
            setSelectedServices([...selectedServices, serviceId]);
        }
    };

    const assignServicesToClient = async () => {
        if (selectedServices.length === 0) {
            setServiceError("You must select at least one service");
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
                throw new Error(data.error || data.msg || "Error assigning services");
            }

            await fetchClientServices();
            closeServiceModal();
        } catch (error) {
            console.error("Error assigning services:", error);
            setServiceError(error.message);
        } finally {
            setServicesLoading(false);
        }
    };

    const NoteModal = () => {

        const [localNote, setLocalNote] = useState("");
        const [localError, setLocalError] = useState(null);

        useEffect(() => {
            if (showNoteModal) {
                setLocalNote(newNote || "");
                setLocalError(null);
            }
        }, [showNoteModal, newNote]);

        const handleNoteChange = (e) => {
            const text = e.target.value;
            setLocalNote(text);

            if (text.trim() !== "" && localError) {
                setLocalError(null);
            }
        };

        const handleSaveNote = () => {
            if (!localNote || localNote.trim() === "") {
                setLocalError("Note cannot be empty");
                return;
            }

            addNewNote(localNote);
        };

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Add new note</h3>
                        <button
                            className="close-button"
                            onClick={closeNoteModal}
                            type="button"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        {localError && (
                            <div className="note-error-message" style={{
                                backgroundColor: "#ffdddd",
                                color: "#d8000c",
                                padding: "10px",
                                borderRadius: "4px",
                                marginBottom: "10px"
                            }}>
                                {localError}
                            </div>
                        )}

                        <textarea
                            placeholder="Write your note here..."
                            value={localNote}
                            onChange={handleNoteChange}
                            rows={4}
                            disabled={notesLoading}
                            style={{
                                width: "100%",
                                padding: "8px",
                                boxSizing: "border-box",
                                resize: "vertical",
                                borderRadius: "4px",
                                border: "1px solid #ccc"
                            }}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            className="cancel-button"
                            onClick={closeNoteModal}
                            disabled={notesLoading}
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            className="save-button"
                            onClick={handleSaveNote}
                            disabled={notesLoading}
                            type="button"
                        >
                            {notesLoading ? "Saving..." : "Save Note"}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const ServiceModal = () => {
        return (
            <div className="modal-overlay">
                <div className="modal-content service-modal">
                    <div className="modal-header">
                        <h3>Add service</h3>
                        <button className="close-button" onClick={closeServiceModal}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        {serviceError && (
                            <div className="service-error-message" style={{
                                backgroundColor: "#ffdddd",
                                color: "#d8000c",
                                padding: "10px",
                                borderRadius: "4px",
                                marginBottom: "15px"
                            }}>
                                {serviceError}
                            </div>
                        )}

                        {!businessId && (
                            <div style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
                                <strong>Diagnostic information:</strong> No selected business detected.
                            </div>
                        )}

                        {businessId && (
                            <div style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
                                <strong>Selected business:</strong> ID: {businessId}
                            </div>
                        )}

                        {servicesLoading ? (
                            <div className="services-loading">Loading available services...</div>
                        ) : (
                            <>
                                {availableServices.length === 0 ? (
                                    <div className="no-services-message">
                                        No services available to assign to this client.
                                        <div style={{ marginTop: "10px" }}>
                                            <button
                                                onClick={fetchAvailableServices}
                                                style={{
                                                    padding: "5px 10px",
                                                    background: "#f0f0f0",
                                                    border: "1px solid #ccc",
                                                    borderRadius: "4px",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                <i className="fas fa-sync-alt"></i> Try again
                                            </button>
                                        </div>
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
        );
    };

    const ServiceHistoryModal = () => {
        const formatDate = (dateString) => {
            if (!dateString) return "Date not available";

            try {
                const date = new Date(dateString);

                if (isNaN(date.getTime())) return "Invalid date";

                return date.toLocaleString();
            } catch (e) {
                console.error("Error formatting date:", e);
                return "Invalid date";
            }
        };

        return (
            <div className="modal-overlay">
                <div className="modal-content service-history-modal">
                    <div className="modal-header">
                        <h3>Completed Services History</h3>
                        <button className="close-button" onClick={closeHistoryModal}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        {historyError && (
                            <div className="history-error-message" style={{
                                backgroundColor: "#ffdddd",
                                color: "#d8000c",
                                padding: "10px",
                                borderRadius: "4px",
                                marginBottom: "15px"
                            }}>
                                <i className="fas fa-exclamation-circle" style={{ marginRight: "8px" }}></i>
                                {historyError}
                            </div>
                        )}

                        {historyLoading ? (
                            <div className="services-loading">
                                <i className="fas fa-spinner fa-spin" style={{ marginRight: "8px" }}></i>
                                Loading service history...
                            </div>
                        ) : (
                            <>
                                {completedServices.length === 0 ? (
                                    <div className="no-services-message">
                                        <i className="fas fa-info-circle" style={{ marginRight: "8px" }}></i>
                                        {historyError ? "Services could not be loaded." : "This client has no completed services."}
                                        <div style={{ marginTop: "10px", fontSize: "0.9rem", color: "#666" }}>
                                            Services will appear here when they are marked as completed.
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="history-summary">
                                            <div className="history-count">
                                                <strong>{completedServices.length}</strong> {completedServices.length === 1 ? 'completed service' : 'completed services'}
                                            </div>
                                        </div>
                                        <div className="completed-services-list">
                                            {completedServices.map(service => (
                                                <div key={service.instance_id} className="service-item completed">
                                                    <div className="service-header">
                                                        <div className="service-name-price">
                                                            <span className="service-name">{service.name}</span>
                                                            <span className="service-price">${service.price}</span>
                                                        </div>
                                                    </div>
                                                    <div className="service-description">
                                                        {service.description || "No description"}
                                                    </div>
                                                    <div className="service-footer">
                                                        <div className="service-status">
                                                            <span className="status-badge completed">
                                                                <i className="fas fa-check-circle"></i> Completed
                                                            </span>
                                                        </div>
                                                        <div className="service-date">
                                                            {formatDate(service.completed_date)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn-primary"
                            onClick={closeHistoryModal}
                            disabled={historyLoading}
                        >
                            Close
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={() => {
                                console.log("Manual update requested");
                                fetchCompletedServices();
                            }}
                            disabled={historyLoading}
                        >
                            <i className="fas fa-sync-alt"></i> Update
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="client-detail-container">
                <div className="loading">Loading client information...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="client-detail-container">
                <div className="error-message">
                    <p>Error: {error}</p>

                    <button onClick={() => navigate(-1)}>Go back</button>

                </div>
            </div>
        );
    }

    if (!client) {
        return (
            <div className="client-detail-container">
                <div className="not-found">

                    <p>Client not found</p>
                    <button onClick={() => navigate(-1)}>Go back</button>

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

                    <div className="client-header">
                        <div className="client-info-main">
                            <h1>{client.name}</h1>
                            <div className="client-id">ID: {client.client_id_number}</div>
                        </div>
                    </div>

                    <div className="client-details-grid">
                        <div className="client-info-section">
                            <h2>Personal Information</h2>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Address:</span>
                                    <span className="info-value">{client.address || "Not available"}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Phone:</span>
                                    <span className="info-value">{client.phone || "Not available"}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Email:</span>
                                    <span className="info-value">{client.email || "Not available"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="client-notes-section">
                            <div className="section-header">
                                <h2>Notes</h2>
                                <button className="add-note-button" onClick={openNoteModal}>
                                    <i className="fas fa-plus"></i> Add note
                                </button>
                            </div>

                            <div className="notes-list">
                                {notesLoading ? (
                                    <div className="notes-loading">Loading notes...</div>
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
                                                    title="Delete note"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                            <div className="note-text">{note.description}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-notes">No notes registered</div>
                                )}
                            </div>
                        </div>

                        <div className="client-services-section">
                            <div className="section-header">
                                <h2>Client Services</h2>
                                <button className="add-service-button" onClick={openServiceModal}>
                                    <i className="fas fa-plus"></i> Add service
                                </button>
                            </div>

                            <div className="services-list">
                                {clientServices.length > 0 ? (
                                    clientServices.map(service => (
                                        <div key={service.instance_id} className="service-item">
                                            <div className="service-header">
                                                <div className="service-name-price">
                                                    <span className="service-name">{service.name}</span>
                                                    <span className="service-price">${service.price}</span>
                                                </div>
                                                <div className="service-date">
                                                    {service.created_at
                                                        ? new Date(service.created_at).toLocaleDateString()
                                                        : "Date not available"}
                                                </div>
                                            </div>
                                            <div className="service-description">
                                                {service.description || "No description"}
                                            </div>
                                            <div className="service-actions">
                                                <button
                                                    className="service-done-button"
                                                    onClick={() => handleServiceDone(service.instance_id)}
                                                    title="Mark as completed"
                                                >
                                                    <i className="fas fa-check"></i> Completed
                                                </button>
                                                <button
                                                    className="service-delete-button"
                                                    onClick={() => handleServiceDelete(service.instance_id)}
                                                    title="Delete service"
                                                >
                                                    <i className="fas fa-trash"></i> Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-services">
                                        <p>No assigned services</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button
                            onClick={openHistoryModal}
                            className="action-button history-button"
                        >
                            <i className="fas fa-history"></i>
                            <span>Service history</span>
                        </button>

                        <button
                            onClick={handleCreateAppointment}
                            className="action-button edit-appointment-button"
                            disabled={!activeService}
                        >
                            <i className="fas fa-calendar-alt"></i>
                            <span>New Appointment</span>
                        </button>
                    </div>

                    {showNoteModal && <NoteModal />}

                    {showServiceModal && <ServiceModal />}

                    {showHistoryModal && <ServiceHistoryModal />}
                </div>
            </div>
        </div>
    );
};