import React from "react";
import "./ProductCard.css";

export const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? "star filled" : "star"}>
        ★
      </span>
    ));
  };

  return (
    <div className="product-card">
      <button className="favorite-btn">♡</button>
      
      <div className="product-image-container">
        {product.image ? (
          <img src={product.image} alt={product.title} className="product-image" />
        ) : (
          <div className="product-image-placeholder">Imagen</div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-price">{product.price} €</h3>
        <p className="product-title">{product.title}</p>
        <div className="product-rating">{renderStars(product.rating)}</div>
      </div>
    </div>
  );
};