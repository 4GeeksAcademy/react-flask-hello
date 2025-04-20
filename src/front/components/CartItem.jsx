import React from 'react';
import { useCart } from '../../hooks/useCart';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.product.image_url || '/placeholder.png'} alt={item.product.name} />
      </div>
      
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.product.name}</h4>
        <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
      </div>
      
      <div className="cart-item-quantity">
        <button 
          className="quantity-btn"
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        
        <span className="quantity">{item.quantity}</span>
        
        <button 
          className="quantity-btn"
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          disabled={item.quantity >= item.product.stock}
        >
          +
        </button>
      </div>
      
      <div className="cart-item-total">
        ${(item.product.price * item.quantity).toFixed(2)}
      </div>
      
      <button 
        className="remove-btn"
        onClick={() => removeFromCart(item.product.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;