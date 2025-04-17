import React, { useState, useEffect, useRef } from "react";
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

    // Estado del modal de notas
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [newNote, setNewNote] = useState("");
    const [notesLoading, setNotesLoading] = useState(false);
    const [noteError, setNoteError] = useState(null);

    // Estado del modal de servicios
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
                // Ordenamos las notas por fecha (más recientes primero)
                const sortedNotes = Array.isArray(data) ?
                    [...data].sort((a, b) => new Date(b.created_at || Date.now()) - new Date(a.created_at || Date.now()))
                    : [];
                setNotes(sortedNotes);
            } else {
                // Si es 404, significa que no hay notas, lo cual es OK
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

    // Función para marcar un servicio como realizado
    const handleServiceDone = async (serviceId) => {
        try {
            const response = await fetch(`${backendUrl}api/services/${serviceId}/complete`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Log para depuración
            console.log("Respuesta del servidor:", response.status);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || data.msg || "Error al marcar el servicio como realizado");
            }

            // Obtener los datos de la respuesta
            const data = await response.json();
            console.log("Servicio marcado como completado:", data);

            // Actualizar la lista de servicios
            await fetchClientServices();

            // Mostrar mensaje de éxito
            alert("Servicio marcado como realizado correctamente");
        } catch (error) {
            console.error("Error al marcar servicio como realizado:", error);
            alert(`Error: ${error.message}`);
        }
    };

    // Función para eliminar un servicio
    const handleServiceDelete = async (serviceId) => {
        if (!confirm("¿Estás seguro de que deseas eliminar este servicio?")) {
            return;
        }

        try {
            const response = await fetch(`${backendUrl}api/clients/${clientId}/services/${serviceId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || data.msg || "Error al eliminar el servicio");
            }

            // Actualizar la lista de servicios
            fetchClientServices();
        } catch (error) {
            console.error("Error deleting service:", error);
            alert(`Error: ${error.message}`);
        }
    };


    // Función para cargar los servicios disponibles
    const fetchAvailableServices = async () => {
        // Verificar si existe el negocio seleccionado
        if (!businessId) {
            setServiceError("No hay negocio seleccionado");
            return;
        }

        setServicesLoading(true);
        setServiceError(null);

        try {
            const requestUrl = `${backendUrl}api/business/${businessId}/services`;
            console.log("URL de la petición:", requestUrl);

            const response = await fetch(requestUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("Respuesta recibida, status:", response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(e => ({ error: "No se pudo procesar la respuesta" }));
                throw new Error(errorData.error || `Error del servidor: ${response.status}`);
            }

            const data = await response.json();
            console.log("Datos recibidos:", data);

            if (!Array.isArray(data)) {
                throw new Error("La respuesta no tiene el formato esperado (array)");
            }

            // Filtrar servicios que el cliente ya tiene asignados
            const clientServiceIds = clientServices.map(service => service.id);
            const filteredServices = data.filter(service => !clientServiceIds.includes(service.id));

            console.log("Servicios filtrados:", filteredServices.length);
            setAvailableServices(filteredServices);
            setSelectedServices([]);
        } catch (error) {
            console.error("Error fetching available services:", error);
            setServiceError(error.message);
        } finally {
            setServicesLoading(false);
        }
    };

    // Funciones de navegación
    const handleEditAppointment = () => {
        if (activeService) {
            navigate(`/appointment/edit/${activeService.id}`);
        }
    };

    const handleViewBudget = () => {
        navigate(`/client/${clientId}/budget`);
    };

    // Modal de notas
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

    const addNewNote = async () => {
        if (newNote.trim() === "") {
            setNoteError("La nota no puede estar vacía");
            return;
        }

        setNotesLoading(true);
        setNoteError(null);

        try {
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

            fetchClientNotes();
        } catch (error) {
            console.error("Error deleting note:", error);
            alert(`Error: ${error.message}`);
        }
    };

    // Modal de servicios
    const openServiceModal = () => {
        setShowServiceModal(true);
        setServiceError(null);
    };

    const closeServiceModal = () => {
        setShowServiceModal(false);
        setSelectedServices([]);
        setServiceError(null);
    };

    // Cargar servicios cuando se abre el modal
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

            await fetchClientServices();
            closeServiceModal();
        } catch (error) {
            console.error("Error assigning services:", error);
            setServiceError(error.message);
        } finally {
            setServicesLoading(false);
        }
    };

    // Componente Modal de Notas
    const NoteModal = () => {
        // Estado local para la nota
        const [localNote, setLocalNote] = useState("");
        const [localError, setLocalError] = useState(null);

        // Inicializar el estado local cuando se abre el modal
        useEffect(() => {
            if (showNoteModal) {
                setLocalNote(newNote || "");
                setLocalError(null);
            }
        }, [showNoteModal, newNote]);

        // Función para manejar cambios en el textarea
        const handleNoteChange = (e) => {
            const text = e.target.value;
            setLocalNote(text);

            // Limpiar el error si el usuario empieza a escribir
            if (text.trim() !== "" && localError) {
                setLocalError(null);
            }
        };

        // Función para guardar la nota
        const handleSaveNote = () => {
            // Validación
            if (!localNote || localNote.trim() === "") {
                setLocalError("La nota no puede estar vacía");
                return;
            }

            // Transferimos el contenido al estado del componente padre
            setNewNote(localNote);

            // Limpiar error en el componente padre si existe
            if (noteError) {
                setNoteError(null);
            }

            // Llamar a la función que maneja el guardado
            addNewNote();
        };

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Agregar Nueva Nota</h3>
                        <button
                            className="close-button"
                            onClick={closeNoteModal}
                            type="button"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        {/* Mostrar el error local en lugar del error del padre */}
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
                            placeholder="Escribe tu nota aquí..."
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
                            Cancelar
                        </button>
                        <button
                            className="save-button"
                            onClick={handleSaveNote}
                            disabled={notesLoading}
                            type="button"
                        >
                            {notesLoading ? "Guardando..." : "Guardar Nota"}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Componente Modal de Servicios
    const ServiceModal = () => {
        return (
            <div className="modal-overlay">
                <div className="modal-content service-modal">
                    <div className="modal-header">
                        <h3>Agregar Servicios</h3>
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

                        {/* Información de diagnóstico sobre el negocio seleccionado */}
                        {!businessId && (
                            <div style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
                                <strong>Información de diagnóstico:</strong> No se detecta un negocio seleccionado.
                            </div>
                        )}

                        {businessId && (
                            <div style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
                                <strong>Negocio seleccionado:</strong> ID: {businessId}
                            </div>
                        )}

                        {servicesLoading ? (
                            <div className="services-loading">Cargando servicios disponibles...</div>
                        ) : (
                            <>
                                {availableServices.length === 0 ? (
                                    <div className="no-services-message">
                                        No hay servicios disponibles para asignar a este cliente.
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
                                                <i className="fas fa-sync-alt"></i> Intentar nuevamente
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
                            Cancelar
                        </button>
                        <button
                            className="save-button"
                            onClick={assignServicesToClient}
                            disabled={servicesLoading || availableServices.length === 0 || selectedServices.length === 0}
                        >
                            {servicesLoading ? "Asignando..." : "Asignar Servicios"}
                        </button>
                    </div>
                </div>
            </div>
        );
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
        <div className="all">
            <div className="container">
                <div className="client-detail-container">
                    <div className="back-button">
                        <button onClick={() => navigate(-1)}>
                            <i className="fas fa-arrow-left"></i> Volver
                        </button>
                    </div>

                    {/* Información principal del cliente */}
                    <div className="client-header">
                        <div className="client-info-main">
                            <h1>{client.name}</h1>
                            <div className="client-id">DNI: {client.client_id_number}</div>
                        </div>
                    </div>

                    <div className="client-details-grid">
                        {/* Información personal */}
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

                        {/* Notas */}
                        <div className="client-notes-section">
                            <div className="section-header">
                                <h2>Notas</h2>
                                <button className="add-note-button" onClick={openNoteModal}>
                                    <i className="fas fa-plus"></i> Agregar nota
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
                                    <div className="no-notes">No hay notas registradas</div>
                                )}
                            </div>
                        </div>

                        {/* Servicio activo */}
                        {/* Servicios del Cliente */}
                        <div className="client-services-section">
                            <div className="section-header">
                                <h2>Servicios del Cliente</h2>
                                <button className="add-service-button" onClick={openServiceModal}>
                                    <i className="fas fa-plus"></i> Agregar servicio
                                </button>
                            </div>

                            <div className="services-list">
                                {clientServices.length > 0 ? (
                                    clientServices.map(service => (
                                        <div key={service.id} className="service-item">
                                            <div className="service-header">
                                                <div className="service-name-price">
                                                    <span className="service-name">{service.name}</span>
                                                    <span className="service-price">${service.price}</span>
                                                </div>
                                                <div className="service-date">
                                                    {service.created_at
                                                        ? new Date(service.created_at).toLocaleDateString()
                                                        : "Fecha no disponible"}
                                                </div>
                                            </div>
                                            <div className="service-description">
                                                {service.description || "Sin descripción"}
                                            </div>
                                            <div className="service-actions">
                                                <button
                                                    className="service-done-button"
                                                    onClick={() => handleServiceDone(service.id)}
                                                    title="Marcar como realizado"
                                                >
                                                    <i className="fas fa-check"></i> Realizado
                                                </button>
                                                <button
                                                    className="service-delete-button"
                                                    onClick={() => handleServiceDelete(service.id)}
                                                    title="Eliminar servicio"
                                                >
                                                    <i className="fas fa-trash"></i> Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-services">
                                        <p>No hay servicios asignados</p>
                                    </div>
                                )}
                            </div>
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

                    {/* Modal para agregar notas */}
                    {showNoteModal && <NoteModal />}

                    {/* Modal para agregar servicios */}
                    {showServiceModal && <ServiceModal />}
                </div>
            </div>
        </div>
    );
};