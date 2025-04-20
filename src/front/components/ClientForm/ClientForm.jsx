import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientForm.css";

export const ClientForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        address: "",
        phone: "",
        client_id_number: "",
        email: "",
        business_id: "",
        services_ids: []
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [businesses, setBusinesses] = useState([]);
    const [services, setServices] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${backendUrl}api/businesses`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setBusinesses(data);
                    if (data.length > 0) {
                        setFormData(prev => ({ ...prev, business_id: data[0].id }));
                    }
                } else {
                    console.error("Error al cargar negocios:", data.error);
                }
            } catch (error) {
                console.error("Error al cargar negocios:", error);
            }
        };

        const fetchServices = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${backendUrl}api/services`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setServices(data);
                } else {
                    console.error("Error al cargar servicios:", data.error);
                }
            } catch (error) {
                console.error("Error al cargar servicios:", error);
            }
        };

        fetchBusinesses();
        fetchServices();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleServiceChange = (e) => {
        const serviceId = parseInt(e.target.value);
        const isChecked = e.target.checked;

        if (isChecked) {
            setFormData(prev => ({
                ...prev,
                services_ids: [...prev.services_ids, serviceId]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                services_ids: prev.services_ids.filter(id => id !== serviceId)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const dataToSend = {
            name: `${formData.name} ${formData.lastName}`,
            address: formData.address,
            phone: formData.phone,
            client_id_number: formData.client_id_number,
            email: formData.email,
            business_id: formData.business_id,
            services_ids: formData.services_ids
        };

        try {
            const response = await fetch(`${backendUrl}api/clients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(dataToSend)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Cliente creado exitosamente");

                setFormData({
                    name: "",
                    lastName: "",
                    address: "",
                    phone: "",
                    client_id_number: "",
                    email: "",
                    business_id: formData.business_id,
                    services_ids: []
                });

                setTimeout(() => navigate("/clients"), 2000);
            } else {
                setError(data.error || "Error al crear el cliente");
            }
        } catch (error) {
            setError("Error de conexión con el servidor");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="client-form-container-box container">
            <div className="client-form-header">
                <h1 className="client-form-title">New Client</h1>
            </div>

            {error && (
                <div className="client-alert-box client-alert-error">
                    <span>{error}</span>
                </div>
            )}
            {success && (
                <div className="client-alert-box client-alert-success">
                    <span>{success}</span>
                </div>
            )}

            <div className="client-form-content">
                <form onSubmit={handleSubmit}>
                    <div className="client-form-row">
                        <div className="client-form-col">
                            <label className="client-form-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="client-form-input"
                                required
                                placeholder="Enter first name"
                            />
                        </div>
                        <div className="client-form-col">
                            <label className="client-form-label">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="client-form-input"
                                required
                                placeholder="Enter last name"
                            />
                        </div>
                    </div>
                    <div className="client-form-row">
                        <div className="client-form-col">
                            <label className="client-form-label">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="client-form-input"
                                required
                                placeholder="Enter full address"
                            />
                        </div>
                        <div className="client-form-col">
                            <label className="client-form-label">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="client-form-input"
                                required
                                placeholder="Enter phone number"
                            />
                        </div>
                    </div>
                    <div className="client-form-row">
                        <div className="client-form-col">
                            <label className="client-form-label">DNI</label>
                            <input
                                type="text"
                                name="client_id_number"
                                value={formData.client_id_number}
                                onChange={handleChange}
                                className="client-form-input"
                                required
                                placeholder="Enter ID number"
                            />
                        </div>
                        <div className="client-form-col">
                            <label className="client-form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="client-form-input"
                                required
                                placeholder="Enter email address"
                            />
                        </div>
                    </div>

                    <div className="client-form-row">
                        <div className="client-form-col client-full-width">
                            <label className="client-form-label">Business</label>
                            <select
                                name="business_id"
                                value={formData.business_id}
                                onChange={handleChange}
                                className="client-form-input"
                                required
                            >
                                <option value="">Select a business</option>
                                {businesses.map(business => (
                                    <option key={business.id} value={business.id}>
                                        {business.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="client-form-buttons">
                        <button
                            type="button"
                            className="client-btn-cancel"
                            onClick={() => navigate("/clients")}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="client-btn-create"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
