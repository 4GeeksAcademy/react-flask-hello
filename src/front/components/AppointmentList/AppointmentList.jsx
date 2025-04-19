import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import "./AppointmentList.css";

export const AppointmentsList = () => {

    const navigate = useNavigate();
    const { store } = useGlobalReducer();
    const { token, selectedBusiness } = store;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

    const [appointments, setAppointments] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        clientId: "",
        date: "",
        status: ""
    });

    useEffect(() => {

        if (!token || !selectedBusiness) {
            setError("Login and business selection required");
            setLoading(false);
            return;
        }

        const loadData = async () => {
            try {
                setLoading(true);
                const apiBaseUrl = backendUrl.endsWith('/') ? backendUrl : `${backendUrl}/`;

                const appointmentsResponse = await fetch(`${apiBaseUrl}api/appointments?business_id=${selectedBusiness.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!appointmentsResponse.ok) {
                    throw new Error(`Error loading appointments: ${appointmentsResponse.status}`);
                }

                const appointmentsData = await appointmentsResponse.json();
                setAppointments(appointmentsData);

                // Cargar clientes
                const clientsResponse = await fetch(`${apiBaseUrl}api/clients`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!clientsResponse.ok) {
                    throw new Error(`Error loading clients: ${clientsResponse.status}`);
                }

                const clientsData = await clientsResponse.json();
                setClients(clientsData.filter(client => client.business_id === selectedBusiness.id));
            } catch (error) {
                console.error("Error loading data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [token, selectedBusiness, backendUrl]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const resetFilters = () => {
        setFilters({
            clientId: "",
            date: "",
            status: ""
        });
    };

    const filteredAppointments = appointments.filter(appointment => {

        if (filters.clientId && appointment.client_id !== parseInt(filters.clientId)) {
            return false;
        }

        if (filters.date) {
            const appointmentDate = new Date(appointment.date_time).toISOString().split('T')[0];
            if (appointmentDate !== filters.date) {
                return false;
            }
        }

        if (filters.status && appointment.status !== filters.status) {
            return false;
        }

        return true;
    });

    const formatDate = (dateString) => {
        if (!dateString) return "Date not available";

        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "Fecha no válida";

            return date.toLocaleString(undefined, {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return "Error in date format";
        }
    };

    const handleDeleteAppointment = async (appointmentId) => {
        if (!confirm("Are you sure you want to delete this appointment?")) {
            return;
        }

        try {
            setLoading(true);
            const apiBaseUrl = backendUrl.endsWith('/') ? backendUrl : `${backendUrl}/`;

            const response = await fetch(`${apiBaseUrl}api/appointments/${appointmentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error deleting the appointment");
            }

            // Actualizar lista de citas
            setAppointments(appointments.filter(app => app.id !== appointmentId));
            alert("Cita eliminada correctamente");
        } catch (error) {
            console.error("Error eliminando cita:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Actualizar estado de cita
    const handleUpdateStatus = async (appointmentId, newStatus) => {
        try {
            setLoading(true);
            const apiBaseUrl = backendUrl.endsWith('/') ? backendUrl : `${backendUrl}/`;

            const response = await fetch(`${apiBaseUrl}api/appointments/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    status: newStatus
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error updating the appointment");
            }

            // Actualizar lista de citas
            const updatedAppointments = appointments.map(app =>
                app.id === appointmentId ? { ...app, status: newStatus } : app
            );

            setAppointments(updatedAppointments);
            alert("Appointment status updated successfully");
        } catch (error) {
            console.error("Error updating the status:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !error) {
        return (
            <div className="appointments-container">
                <div className="loading-spinner">Cargando citas...</div>
            </div>
        );
    }

    return (
        
        <div className="appointments-container">
            <div className="appointments-header">
                <h2>Appointment Management</h2>
                <Link to="/appointment/create" className="create-appointment-button">
                    <i className="fas fa-plus"></i> New Appointment
                </Link>
            </div>

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={() => navigate(-1)}>Back</button>
                </div>
            )}

            <div className="appointments-filters">
                <div className="filter-group">
                    <label htmlFor="clientId">Client:</label>
                    <select
                        id="clientId"
                        name="clientId"
                        value={filters.clientId}
                        onChange={handleFilterChange}
                    >
                        <option value="">All the clients</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={filters.date}
                        onChange={handleFilterChange}
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="status">States:</label>
                    <select
                        id="status"
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                    >
                        <option value="">All the states</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <button className="reset-filters-button" onClick={resetFilters}>
                    <i className="fas fa-sync-alt"></i> Reset filters
                </button>
            </div>

            {filteredAppointments.length === 0 ? (
                <div className="no-appointments">
                    <p>There are no quotes that match the selected filters.</p>
                    {filters.clientId || filters.date || filters.status ? (
                        <button className="reset-filters-button" onClick={resetFilters}>
                            Show all the appointments
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                <div className="appointments-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Service</th>
                                <th>Professional</th>
                                <th>Date and Time</th>
                                <th>State</th>
                                <th>Accions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.map(appointment => (
                                <tr key={appointment.id} className={`appointment-row status-${appointment.status}`}>
                                    <td>
                                        <Link to={`/client/${appointment.client_id}`} className="client-link">
                                            {appointment.client_name}
                                        </Link>
                                    </td>
                                    <td>{appointment.service_name}</td>
                                    <td>{appointment.user_name}</td>
                                    <td>{formatDate(appointment.date_time)}</td>
                                    <td>
                                        <span className={`status-badge ${appointment.status}`}>
                                            {appointment.status === 'pending' && 'Pendiente'}
                                            {appointment.status === 'confirmed' && 'Confirmada'}
                                            {appointment.status === 'cancelled' && 'Cancelada'}
                                            {appointment.status === 'completed' && 'Completada'}
                                        </span>
                                    </td>
                                    <td className="actions-cell">
                                        <div className="appointment-actions">
                                            {appointment.status === 'pending' && (
                                                <button
                                                    className="confirm-button"
                                                    onClick={() => handleUpdateStatus(appointment.id, 'confirmed')}
                                                    title="Confirm appointment"
                                                >
                                                    <i className="fas fa-check"></i>
                                                </button>
                                            )}

                                            {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                                                <button
                                                    className="complete-button"
                                                    onClick={() => handleUpdateStatus(appointment.id, 'completed')}
                                                    title="Mark as completed"
                                                >
                                                    <i className="fas fa-clipboard-check"></i>
                                                </button>
                                            )}

                                            {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                                                <button
                                                    className="cancel-button"
                                                    onClick={() => handleUpdateStatus(appointment.id, 'cancelled')}
                                                    title="Cancel appointment"
                                                >
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            )}

                                            <button
                                                className="delete-button"
                                                onClick={() => handleDeleteAppointment(appointment.id)}
                                                title="Delet appointment"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
