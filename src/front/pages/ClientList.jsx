import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ClientesList from "../components/Lista";
import ScrollToTop from "../components/ScrollToTop";
import SearchInput from "../components/Search";

const ClientList = () => {
  const [search, setSearch] = useState(""); 

  const handleSearchChange = (e) => {
    setSearch(e.target.value)}; 

  return (
    <ScrollToTop>
      <div style={{ backgroundColor: "#CAD2C5", minHeight: "100vh" }}>
        <Navbar />

        
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder="Buscar por nombre o DNI..."
        />

        
        <ClientesList search={search} />
      </div>
    </ScrollToTop>
  );
};

export default ClientList;