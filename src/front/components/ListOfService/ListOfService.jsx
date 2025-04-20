import React, { useEffect, useState } from "react";
import "./ListOfService.css";
import { SearchInput } from "../SearchInput/SearchInput";
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const ListOfService = () => {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBusinessId, setSelectedBusinessId] = useState("");

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [notification, setNotification] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        business_id: ""
    });

    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const [editingService, setEditingService] = useState(null);

    const { store, dispatch } = useGlobalReducer();
    const { token, business } = store;

    useEffect(() => {
        fetchServices();

        // Load businesses if not already loaded
        if (business.length === 0) {
            fetchBusinesses();
        }
    }, [token]);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
            const response = await fetch(`${backendUrl}api/services`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Error fetching services");
            }

            setServices(data);
            setError(null);
        } catch (error) {
            console.error("Error loading services:", error);
            setError("Failed to load services. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const fetchBusinesses = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
            const response = await fetch(`${backendUrl}api/businesses`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Error fetching businesses");

            dispatch({ type: "set_business", payload: data });
        } catch (err) {
            console.error("Error loading businesses:", err);
        }
    };

    const handleBusinessFilterChange = (e) => {
        setSelectedBusinessId(e.target.value);
    };

    const handleOpenModal = () => {
        setFormData({
            name: "",
            description: "",
            price: "",
            business_id: selectedBusinessId || (business.length > 0 ? business[0].id : "")
        });
        setFormError(null);
        setEditingService(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingService(null);
        setFormData({
            name: "",
            description: "",
            price: "",
            business_id: selectedBusinessId || (business.length > 0 ? business[0].id : "")
        });
        setFormError(null);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEditService = (service) => {
        setEditingService(service);
        setFormData({
            name: service.name,
            description: service.description,
            price: service.price,
            business_id: service.business_id
        });
        setShowModal(true);
    };

    const handleDeleteService = async (serviceName) => {
        if (!window.confirm(`¿Estás seguro que deseas eliminar el servicio "${serviceName}"?`)) {
            return;
        }

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
            const response = await fetch(`${backendUrl}api/services/${serviceName}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error al eliminar el servicio");
            }

            // Actualizar la lista de servicios
            setServices(services.filter(service => service.name !== serviceName));

            // Mostrar notificación
            setNotification({
                type: "success",
                message: "Servicio eliminado correctamente"
            });

            // Limpiar notificación después de 5 segundos
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        } catch (error) {
            console.error("Error al eliminar el servicio:", error);
            setNotification({
                type: "error",
                message: error.message || "Error al eliminar el servicio"
            });

            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        setFormError(null);

        if (!formData.business_id) {
            setFormError("Por favor selecciona un negocio");
            setFormLoading(false);
            return;
        }

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

            // Determinar si es una actualización o creación
            const isUpdate = !!editingService;

            const url = isUpdate
                ? `${backendUrl}api/services/${editingService.name}`
                : `${backendUrl}api/services`;

            const method = isUpdate ? "PUT" : "POST";

            // Para actualización, solo enviamos los campos que se pueden actualizar
            const body = isUpdate
                ? JSON.stringify({
                    description: formData.description,
                    price: formData.price
                })
                : JSON.stringify(formData);

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: body
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || `Error ${isUpdate ? "actualizando" : "creando"} el servicio`);

            // Actualizar lista de servicios
            if (isUpdate) {
                setServices(services.map(service =>
                    service.name === editingService.name ? data.service : service
                ));
            } else {
                setServices([...services, data.service]);
            }

            // Mostrar notificación
            setNotification({
                type: "success",
                message: isUpdate ? "Servicio actualizado correctamente" : "Servicio creado correctamente"
            });

            // Cerrar modal y limpiar estado
            handleCloseModal();

            // Limpiar notificación después de 5 segundos
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        } catch (err) {
            console.error("Error:", err);
            setFormError(err.message || `Error ${editingService ? "actualizando" : "creando"} el servicio`);
        } finally {
            setFormLoading(false);
        }
    };

    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBusiness = !selectedBusinessId || service.business_id.toString() === selectedBusinessId;
        return matchesSearch && matchesBusiness;
    });

    return (
        <div className="all-services">
            <div className="services-page">
                <div className="services-header">
                    <h1>Services</h1>
                    <p>Manage your clinic's available services</p>
                </div>

                {notification && (
                    <div className={`notification ${notification.type}`}>
                        <i className={notification.type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle"}></i>
                        <span>{notification.message}</span>
                        <button onClick={() => setNotification(null)} className="close-notification">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                )}

                <div className="services-actions">
                    <div className="services-filters">
                        <div className="business-filter">
                            <select
                                value={selectedBusinessId}
                                onChange={handleBusinessFilterChange}
                                className="business-select"
                            >
                                <option value="">All Businesses</option>
                                {business.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <SearchInput
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search services..."
                        />
                    </div>

                    <button onClick={handleOpenModal} className="add-service-button">
                        <i className="fas fa-plus"></i> Add Service
                    </button>
                </div>

                {loading ? (
                    <div className="services-loading">
                        <div className="loader"></div>
                        <p>Loading services...</p>
                    </div>
                ) : error ? (
                    <div className="services-error">
                        <i className="fas fa-exclamation-circle"></i>
                        <p>{error}</p>
                        <button onClick={fetchServices}>Try Again</button>
                    </div>
                ) : filteredServices.length === 0 ? (
                    <div className="services-empty">
                        <i className="fas fa-file-medical-alt"></i>
                        <p>
                            {searchTerm || selectedBusinessId
                                ? "No services match your filters"
                                : "No services available yet"}
                        </p>
                        {searchTerm || selectedBusinessId ? (
                            <button onClick={() => {
                                setSearchTerm("");
                                setSelectedBusinessId("");
                            }}>Clear Filters</button>
                        ) : (
                            <button onClick={handleOpenModal}>Add Your First Service</button>
                        )}
                    </div>
                ) : (
                    <div className="services-grid">
                        {filteredServices.map((service) => (
                            <div key={service.id} className="service-card">
                                <div className="service-card-header">
                                    <h2>{service.name}</h2>
                                    <div className="service-price">${service.price}</div>
                                </div>

                                <div className="service-card-content">
                                    <p>{service.description}</p>
                                </div>

                                <div className="service-card-actions">
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEditService(service)}
                                    >
                                        <i className="fas fa-edit"></i> Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteService(service.name)}
                                    >
                                        <i className="fas fa-trash"></i> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Service Form Modal */}
                {showModal && (
                    <div className="modal-overlay" onClick={handleCloseModal}>
                        <div className="service-form-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>{editingService ? "Edit Service" : "New Service"}</h2>
                                <button className="close-modal" onClick={handleCloseModal}>
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            {formError && (
                                <div className="modal-error">
                                    <i className="fas fa-exclamation-circle"></i>
                                    <span>{formError}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="service-form">
                                <div className="form-group">
                                    <label htmlFor="name">Service Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        placeholder="Enter service name"
                                        required
                                        disabled={!!editingService}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleFormChange}
                                        placeholder="Describe the service"
                                        rows={4}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="business_id">Business</label>
                                        <select
                                            id="business_id"
                                            name="business_id"
                                            value={formData.business_id}
                                            onChange={handleFormChange}
                                            required
                                        >
                                            <option value="">Select Business</option>
                                            {business.map((b) => (
                                                <option key={b.id} value={b.id}>
                                                    {b.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="price">Price ($)</label>
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleFormChange}
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="cancel-button"
                                        onClick={handleCloseModal}
                                        disabled={formLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="submit-button"
                                        disabled={formLoading}
                                    >
                                        {formLoading ? (
                                            <>
                                                <div className="button-loader"></div>
                                                {editingService ? "Updating..." : "Creating..."}
                                            </>
                                        ) : (
                                            <>
                                                <i className={`fas fa-${editingService ? 'save' : 'plus'}`}></i>
                                                {editingService ? "Update Service" : "Create Service"}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};