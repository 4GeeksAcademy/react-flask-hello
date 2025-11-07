import React, { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { ProductCard } from "../components/ProductCard";
import "./ExplorePage.css";

export const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { id: 1, title: "Producto 1", price: 10, image: "", rating: 4 },
    { id: 2, title: "Producto 2", price: 10, image: "", rating: 5 },
    { id: 3, title: "Producto 3", price: 10, image: "", rating: 3 },
    { id: 4, title: "Producto 4", price: 10, image: "", rating: 4 },
    { id: 5, title: "Producto 5", price: 10, image: "", rating: 5 },
    { id: 6, title: "Producto 6", price: 10, image: "", rating: 4 },
    { id: 7, title: "Producto 7", price: 10, image: "", rating: 3 },
    { id: 8, title: "Producto 8", price: 10, image: "", rating: 5 },
    { id: 9, title: "Producto 9", price: 10, image: "", rating: 4 },
  ];

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h1>Explorar Productos</h1>
        <SearchBar onSearch={setSearchTerm} />
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="history-section">
        <h2>Historial:</h2>
        <div className="history-content">
          <p>Tus productos visitados recientemente aparecerán aquí</p>
        </div>
      </div>
    </div>
  );
};