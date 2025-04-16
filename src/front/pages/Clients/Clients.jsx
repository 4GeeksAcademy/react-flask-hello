import React, { useState, useEffect } from "react";
import { ClientList } from "../../components/ClientsList/ClientList";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import "./Clients.css";

export const Clients = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const { store, dispatch } = useGlobalReducer();
    const { token, business, selectedBusiness } = store;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

    // Efecto para cargar clientes al inicio
    useEffect(() => {
        if (token) {
            // Limpiar estado para evitar problemas con datos antiguos
            localStorage.removeItem("clients");
            localStorage.removeItem("selected_business");

            dispatch({
                type: "set_clients",
                payload: []
            });

            dispatch({
                type: "select_business",
                payload: null
            });

            fetchClients();

            if (!business || business.length === 0) {
                fetchBusinesses();
            }
        }
    }, [token]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleBusinessChange = (e) => {
        const selectedBusinessId = e.target.value;
        console.log("Seleccionando negocio:", selectedBusinessId);

        if (!selectedBusinessId) {
            // Si se selecciona "All the businesses"
            dispatch({
                type: "select_business",
                payload: null
            });
            return;
        }

        // Buscar el negocio por su ID (convertido a string para comparación segura)
        const businessObj = business.find(b => String(b.id) === String(selectedBusinessId));

        if (businessObj) {
            console.log("Negocio seleccionado:", businessObj);
            dispatch({
                type: "select_business",
                payload: businessObj
            });
        } else {
            console.error("No se encontró el negocio con ID:", selectedBusinessId);
        }
    };

    const fetchClients = async () => {
        if (!token) return;

        setLoading(true);

        try {
            const response = await fetch(`${backendUrl}api/clients`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Clientes recibidos:", data);

            // Asegurar que data es un array antes de establecerlo en el estado
            if (Array.isArray(data)) {
                dispatch({
                    type: "set_clients",
                    payload: data
                });
            } else {
                console.error("Los datos recibidos no son un array:", data);
                dispatch({
                    type: "set_clients",
                    payload: []
                });
            }
        } catch (error) {
            console.error("Error fetching clients:", error);

            dispatch({
                type: "set_error",
                payload: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchBusinesses = async () => {
        if (!token) return;

        try {
            const response = await fetch(`${backendUrl}api/businesses`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Negocios recibidos:", data);

            // Asegurar que data es un array antes de establecerlo en el estado
            if (Array.isArray(data)) {
                dispatch({
                    type: "set_business",
                    payload: data
                });
            } else {
                console.error("Los datos de negocios no son un array:", data);
                dispatch({
                    type: "set_business",
                    payload: []
                });
            }
        } catch (error) {
            console.error("Error fetching businesses:", error);

            dispatch({
                type: "set_error",
                payload: error.message
            });
        }
    };

    return (
        <div className="clients-container">
            <div className="filter-container">
                <SearchInput
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search by name or ID..."
                />

                <div className="business-filter">
                    <select
                        value={selectedBusiness ? selectedBusiness.id : ""}
                        onChange={handleBusinessChange}
                        className="business-select"
                    >
                        <option value="">All the businesses</option>
                        {business && business.length > 0 ? (
                            business.map(b => (
                                <option key={b.id} value={b.id}>
                                    {/* Usar name según el modelo que mostraste */}
                                    {b.name || b.business_name || `Business ${b.id}`}
                                </option>
                            ))
                        ) : (
                            <option disabled>No businesses available</option>
                        )}
                    </select>
                </div>
            </div>

            {loading ? (
                <p className="loading-message">Loading clients...</p>
            ) : (
                <ClientList search={search} />
            )}

            <button
                onClick={fetchClients}
                className="reload-button"
                style={{ marginTop: '20px' }}
            >
                Refresh Clients
            </button>
        </div>
    );
};