import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import "./AppointmentForm.css";

export const AppointmentForm = ({ clientId = null }) => {
    const navigate = useNavigate();
    const { store } = useGlobalReducer();
    const { token, selectedBusiness, user } = store;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

    const [clients, setClients] = useState([]);
    const [services, setServices] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        clientEmail: clientId ? "" : "",
        serviceName: "",
        username: user?.username || "",
        date: "",
        time: "09:00",
        businessId: selectedBusiness?.id || ""
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (!token || !selectedBusiness) {
            setError("Login and business selection required");
            setLoading(false);
            return;
        }

        const loadInitialData = async () => {

            try {
                const clientsResponse = await fetch(`${backendUrl}api/clients`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!clientsResponse.ok) {
                    throw new Error("Error loading clients");
                }

                const clientsData = await clientsResponse.json();
                setClients(clientsData);

                if (clientId) {
                    const client = clientsData.find(c => c.id === parseInt(clientId));
                    if (client) {
                        setFormData(prev => ({
                            ...prev,
                            clientEmail: client.email
                        }));
                    }
                }

                const servicesResponse = await fetch(`${backendUrl}api/business/${selectedBusiness.id}/services`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!servicesResponse.ok) {
                    throw new Error("Error loading services");
                }

                const servicesData = await servicesResponse.json();
                setServices(servicesData);

                const usersResponse = await fetch(`${backendUrl}api/business/${selectedBusiness.id}/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!usersResponse.ok) {
                    throw new Error("Error loading professionals");
                }

                const usersData = await usersResponse.json();
                setUsers(usersData);

                setLoading(false);
            } catch (error) {
                console.error("Error loading initial data:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        loadInitialData();
    }, [token, selectedBusiness, clientId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: null
            });
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.clientEmail) {
            errors.clientEmail = "You must select a client";
        }

        if (!formData.serviceName) {
            errors.serviceName = "You must select a service";
        }

        if (!formData.username) {
            errors.username = "You must select a professional";
        }

        if (!formData.date) {
            errors.date = "You must select a date";
        } else {
            const selectedDate = new Date(formData.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                errors.date = "You cannot select a past date";
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            const dateTime = `${formData.date}T${formData.time}:00Z`;

            const appointmentData = {
                client_email: formData.clientEmail,
                service_name: formData.serviceName,
                username: formData.username,
                date_time: dateTime,
                business_id: selectedBusiness.id
            };

            console.log("Sending appointment data:", appointmentData);

            const response = await fetch(`${backendUrl}api/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(appointmentData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error creating the appointment");
            }

            console.log("response:", data);
            setSuccess(true);

            setFormData({
                clientEmail: "",
                serviceName: "",
                username: user?.username || "",
                date: "",
                time: "09:00",
                businessId: selectedBusiness?.id || ""
            });

            setTimeout(() => {
                navigate('/calendar');
            }, 1000);

        } catch (error) {
            console.error("Error creating the appointment:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !error) {
        return (
            <div className="appointment-form-container">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    if (error && !clientId) {
        return (
            <div className="appointment-form-container">
                <div className="error-message">
                    <h3>Error</h3>
                    <p>{error}</p>
                    <button onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        );
    }

    return (

        <div className="all-appointment-form">
            <div className="container">
                <div className="appointment-form-container">
                    <div className="form-header">
                        <h2>Create new appointment</h2>
                        <button className="back-button" onClick={() => navigate(-1)}>
                            <i className="fas fa-arrow-left"></i> Back
                        </button>
                    </div>

                    {success && (
                        <div className="success-message">
                            <i className="fas fa-check-circle"></i>
                            <p>Appointment created successfully! Redirecting to calendar...</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="appointment-form">
                        <div className="form-group">
                            <label htmlFor="clientEmail">Client:</label>
                            <select
                                id="clientEmail"
                                name="clientEmail"
                                value={formData.clientEmail}
                                onChange={handleChange}
                                disabled={loading || clientId}
                                className={formErrors.clientEmail ? "error" : ""}
                            >
                                <option value="">Select a client</option>
                                {clients.map(client => (
                                    <option key={client.id} value={client.email}>
                                        {client.name} ({client.email})
                                    </option>
                                ))}
                            </select>
                            {formErrors.clientEmail && <div className="error-text">{formErrors.clientEmail}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="serviceName">Service:</label>
                            <select
                                id="serviceName"
                                name="serviceName"
                                value={formData.serviceName}
                                onChange={handleChange}
                                disabled={loading}
                                className={formErrors.serviceName ? "error" : ""}
                            >
                                <option value="">Select a service</option>
                                {services.map(service => (
                                    <option key={service.id} value={service.name}>
                                        {service.name} (${service.price})
                                    </option>
                                ))}
                            </select>
                            {formErrors.serviceName && <div className="error-text">{formErrors.serviceName}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Professional:</label>
                            <select
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                disabled={loading}
                                className={formErrors.username ? "error" : ""}
                            >
                                <option value="">Select a professional</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.username}>
                                        {user.username}
                                    </option>
                                ))}
                            </select>
                            {formErrors.username && <div className="error-text">{formErrors.username}</div>}
                        </div>

                        <div className="date-time-container">
                            <div className="form-group">
                                <label htmlFor="date">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    disabled={loading}
                                    min={new Date().toISOString().split('T')[0]}
                                    className={formErrors.date ? "error" : ""}
                                />
                                {formErrors.date && <div className="error-text">{formErrors.date}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="time">Hour:</label>
                                <select
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className={formErrors.time ? "error" : ""}
                                >
                                    <option value="09:00">09:00</option>
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="16:00">16:00</option>
                                    <option value="17:00">17:00</option>
                                    <option value="18:00">18:00</option>
                                    <option value="19:00">19:00</option>
                                </select>
                                {formErrors.time && <div className="error-text">{formErrors.time}</div>}
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => navigate(-1)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="submit-button"
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create Appointment'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};