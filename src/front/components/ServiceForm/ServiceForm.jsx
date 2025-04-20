import React, { useState, useEffect } from "react";
import "./ServiceForm.css";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";

export const ServiceForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        business_id: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        if (store.business.length === 0) {
            const fetchBusinesses = async () => {
                try {
                    const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
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
                    setError("Failed to load businesses. Please try again.");
                }
            };

            fetchBusinesses();
        }
    }, [store.business, store.token, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!formData.business_id) {
            setError("Please select a business");
            setLoading(false);
            return;
        }

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
            const response = await fetch(`${backendUrl}api/services`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${store.token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Error creating service");

            navigate("/services", {
                state: {
                    notification: {
                        type: "success",
                        message: "Service created successfully!"
                    }
                }
            });
        } catch (err) {
            console.error("Error:", err);
            setError(err.message || "Failed to create service. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="service-form-container">
            <div className="service-form-card">
                <div className="service-form-header">
                    <h1>New Service</h1>
                    <p>Create a new service for your clinic</p>
                </div>

                {error && (
                    <div className="service-form-error">
                        <i className="fas fa-exclamation-circle"></i>
                        <span>{error}</span>
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
                            onChange={handleChange}
                            placeholder="Enter service name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
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
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Business</option>
                                {store.business.map((business) => (
                                    <option key={business.id} value={business.id}>
                                        {business.name}
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
                                onChange={handleChange}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <Link to="/services" className="cancel-button">
                            <i className="fas fa-times"></i> Cancel
                        </Link>
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="button-loader"></div>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-check"></i> Create Service
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};