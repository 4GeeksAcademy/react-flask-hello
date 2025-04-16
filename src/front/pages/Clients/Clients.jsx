import React, { useState, useEffect } from "react";
import { ClientList } from "../../components/ClientsList/List";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const Clients = () => {
    const [search, setSearch] = useState("");
    const { store, dispatch } = useGlobalReducer();
    const { token, clients } = store;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

    useEffect(() => {
        
        if (token && clients.length === 0) {
            fetchClients();
        }
    }, [token]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const fetchClients = async () => {
        if (!token) return;
        
        try {
            const response = await fetch(`${backendUrl}/api/clients`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Error loading clients');
            }

            dispatch({
                type: "set_clients",
                payload: data
            });
        } catch (error) {
            console.error("Error fetching clients:", error);

            dispatch({
                type: "set_error",
                payload: error.message
            });
        }
    };

    return (
        <div className="clients-container">
           
            
            <SearchInput
                value={search}
                onChange={handleSearchChange}
                placeholder="Buscar por nombre o DNI..."
            />

            <ClientList search={search} />
        </div>
    );
};