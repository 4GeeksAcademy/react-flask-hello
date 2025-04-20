import React, { useState, useEffect } from "react";
import "./ServiceForm.css";
import Logo from "../../assets/images/flow-logo.svg";
import useGlobalReducer from "../../hooks/useGlobalReducer";
export const ServiceForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [selectedBusinessId, setSelectedBusinessId] = useState("");
    const { store, dispatch } = useGlobalReducer();
    useEffect(() => {
        if (store.business.length === 0) {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
            const fetchBusinesses = async () => {
                try {
                    const response = await fetch(`${backendUrl}api/businesses`, {
                        headers: {
                            Authorization: `Bearer ${store.token}`,
                        },
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error || "Error fetching businesses");
                    dispatch({ type: "set_business", payload: data });
                } catch (err) {
                    console.error("Error loading businesses:", err);
                }
            };
            fetchBusinesses();
        }
    }, [store.business, store.token, dispatch]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedBusinessId) {
            alert("Por favor selecciona un negocio");
            return;
        }
        const addService = {
            name,
            description,
            price,
            business_id: selectedBusinessId,
        };
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
            const response = await fetch(`${backendUrl}api/services`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${store.token}`,
                },
                body: JSON.stringify(addService),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Error creating service");
            alert("Service Created");
            setName("");
            setDescription("");
            setPrice("");
            setSelectedBusinessId("");
        } catch (err) {
            console.error("Error:", err);
            alert("Error al crear el servicio");
        }
    };
    return (
        <div className="formBox container">
            <div className="divTitleLogo">
                <img src={Logo} className="logoFor" />
                <h1 className="formTitle">New Service</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row col-4 p-2">
                    <label className="labelStyle">Name:</label>
                    <input
                        type="text"
                        className="w-100 border-black"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="row col-12 p-2">
                    <label className="labelStyle">Description:</label>
                    <textarea
                        className="w-100 h-100 p-5 border-black"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="row">
                <div className="col-4 p-2">
                    <label className="labelStyle">Select Business:</label>
                    <select
                        className="form-select border-black"
                        value={selectedBusinessId}
                        onChange={(e) => setSelectedBusinessId(e.target.value)}
                        required
                    >
                        <option value="">-- Select Business --</option>
                        {store.business.map((business) => (
                            <option key={business.id} value={business.id}>
                                {business.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-4">
                </div>
                <div className="row col-3 p-2">
                    <label className="labelStyle">Service Price:</label>
                    <input
                        type="number"
                        className="border-black"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                </div>
                <div className="divButton">
                    <button className="buttonStyle mt-4" type="submit">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};