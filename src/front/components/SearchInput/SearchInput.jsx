import React from "react";
import "./SearchInput.css";

export const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-box">
      <input
        type="text"
        className="search-field"
        placeholder={placeholder || "Buscar..."}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};