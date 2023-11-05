import React, { useState } from "react";

const SearchReview = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
    setIsSearching(true);
  };

  const handleCancel = () => {
    setSearchQuery("");
    setIsSearching(false);
    handleSearch("");
  };

  return (
    <div className="filter-content mt-5">
      <div className="filter-items">
        <div className="filter-search filter-review filter-item">
          <input
            className="review-input-search"
            type="text"
            id="searchQuery"
            placeholder="Busca por país, ciudad o palabra clave!"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-btn">
          {isSearching ? (
            <button className="btn-cancel-search" onClick={handleCancel}>Cancelar búsqueda</button>
          ) : (
            <button className="btn-search" type="submit" onClick={handleSubmit}>
              Buscar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchReview;
