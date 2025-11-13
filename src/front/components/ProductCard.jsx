import React, { useState } from "react";
import "./ProductCard.css";
import productServices from "../services/product.services";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {

  const { store, dispatch } = useGlobalReducer();


  console.log(product)
  const defaultLogo = 'https://res.cloudinary.com/dqupxyrvx/image/upload/v1762548593/tfw6vouoljoki3eq75wp.png'

  return (
    <Link className="nav-link" to={'/single/' + product.id}>
      <div className="product-card">
        <div className="product-image-container">
          {product.imagenes ? (
            <img src={product.imagenes} alt={product.nombre_producto} className="product-image" />
          ) : (
            <div className="product-image-placeholder">Imagen</div>
          )}
        </div>

        <div className="product-info">
          <h3 className="product-price">{product.precio.toFixed(2)} €</h3>
          <p className="product-title"><strong>{product.nombre_producto}</strong></p>

        </div>
      </div>
    </Link>
  );
};