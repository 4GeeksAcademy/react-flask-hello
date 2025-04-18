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

    useEffect(() => {
        if (token) {
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
        console.log("Selecting business:", selectedBusinessId);

        if (!selectedBusinessId) {
            dispatch({
                type: "select_business",
                payload: null
            });
            return;
        }

        const businessObj = business.find(b => String(b.id) === String(selectedBusinessId));

        if (businessObj) {
            console.log("Selected business:", businessObj);
            dispatch({
                type: "select_business",
                payload: businessObj
            });
        } else {
            console.error("Business not found with ID:", selectedBusinessId);
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
            console.log("Clients received:", data);

            if (Array.isArray(data)) {
                dispatch({
                    type: "set_clients",
                    payload: data
                });
            } else {
                console.error("Data received is not an array:", data);
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
            console.log("Businesses received:", data);

            if (Array.isArray(data)) {
                dispatch({
                    type: "set_business",
                    payload: data
                });
            } else {
                console.error("Business data is not an array:", data);
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

    const renderBusinessOptions = () => {
        if (!business || business.length === 0) {
            return <option disabled>No businesses available</option>;
        }

        const options = [];

        if (selectedBusiness) {
            const businessName = selectedBusiness.name || selectedBusiness.business_name || `Business ${selectedBusiness.id}`;
            options.push(
                <option key={`selected-${selectedBusiness.id}`} value={selectedBusiness.id}>
                    {businessName} 
                </option>
            );

            options.push(
                <option key="all" value="">
                    All businesses
                </option>
            );
        } else {
            options.push(
                <option key="all" value="">
                    All businesses
                </option>
            );
        }

        business.forEach(b => {
            if (selectedBusiness && String(b.id) === String(selectedBusiness.id)) {
                return;
            }

            const businessName = b.name || b.business_name || `Business ${b.id}`;
            options.push(
                <option key={b.id} value={b.id}>
                    {businessName}
                </option>
            );
        });

        return options;
    };

    useEffect(() => {

        if (business && business.length > 0 && !selectedBusiness) {
            const savedBusinessId = localStorage.getItem("selected_business");
            if (savedBusinessId) {
                const savedBusiness = business.find(b => String(b.id) === String(savedBusinessId));
                if (savedBusiness) {
                    dispatch({
                        type: "select_business",
                        payload: savedBusiness
                    });
                }
            }
        }
    }, [business]);

    useEffect(() => {
        if (selectedBusiness) {
            localStorage.setItem("selected_business", selectedBusiness.id);
        } else {
            localStorage.removeItem("selected_business");
        }
    }, [selectedBusiness]);

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
                        {renderBusinessOptions()}
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