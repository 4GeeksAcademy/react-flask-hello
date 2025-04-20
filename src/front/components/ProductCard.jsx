import React from 'react';
import { useCart } from '../../hooks/useCart';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="product-card">
      <div className="product-image">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} />
        ) : (
          <div className="no-image">No image</div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-description">{product.description}</p>
      </div>
      
      <div className="product-actions">
        <button 
          className="view-details-btn"
          onClick={() => window.location.href = `/product/${product.id}`}
        >
          View Details
        </button>
        
        <button 
          className="add-to-cart-btn"
          onClick={() => addToCart(product, 1)}
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;