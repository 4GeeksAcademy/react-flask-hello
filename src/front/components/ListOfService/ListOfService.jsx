import React, { useEffect, useState } from "react";
import "./ListOfService.css";
import { SearchInput } from "../SearchInput/SearchInput";
import { Link } from "react-router-dom"

export const ListOfService = () => {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
                const response = await fetch(`${backendUrl}api/services`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || "Error fetching services");
                }
                setServices(data);
            } catch (error) {
                console.error("Error loading services:", error);
            }
        };
        fetchServices();
    }, []);
    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <>
        <div className="container d-flex">
        < SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search services..." />
        
            <Link to="/newservice">
            <button className="buttonAdd"><strong>Add Service</strong></button>
            </Link>

        </div>
            {filteredServices.map((service, index) => (
                <div key={index} className="boxService container">
                    <div className="serviceTitle row">
                        <h1>{service.name}</h1>
                    </div>
                    <div className="serviceDescription">
                        <h4>Description:</h4>
                        <span>{service.description}</span>
                    </div>
                    <div className="row">
                        <div className="servicePrice">
                            <h5>Price:</h5>
                            <span>{service.price}</span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
