import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ClientesList from "../components/Lista";
import ScrollToTop from "../components/ScrollToTop"


const ClientList = () => {
    const [search, setSearch] = useState("");

    
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <ScrollToTop>
            <div style={{ backgroundColor: "#CAD2C5", minHeight: "100vh" }}>
                <Navbar />
                <div className="container mt-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre o DNI..."
                        value={search}
                        onChange={handleSearchChange}
                        style={{ width: "300px", marginBottom: "20px" }}
                    />
                    <ClientesList search={search} />
                </div>
            </div>

        </ScrollToTop>
    );
};

export default ClientList;