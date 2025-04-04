import React from "react";

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="container mt-4">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder || "Buscar..."}
        value={value}
        onChange={onChange}
        style={{ width: "300px", marginBottom: "20px" }}
      />
    </div>
  );
};

export default SearchInput;