import React from 'react';
import { Trash2 } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { Link } from 'react-router-dom';

export default function CartItem({ item }) {
  const { dispatch, showToast } = useAppContext();

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: item.id, quantity } });
    }
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
    showToast(`${item.name} removed from cart`);
  };

  return (
    <div className="cart-item">
      <Link to={`/product/${item.id}`} className="cart-item__image-link">
        <img src={item.image} alt={item.name} className="cart-item__image" />
      </Link>
      <div className="cart-item__details">
        <Link to={`/product/${item.id}`}>
          <h4 className="cart-item__title">{item.name}</h4>
        </Link>
        <span className="cart-item__price">${item.price.toFixed(2)}</span>
      </div>
      <div className="cart-item__actions">
        <input 
          type="number" 
          min="1" 
          value={item.quantity} 
          onChange={handleQuantityChange}
          className="cart-item__quantity"
        />
        <button className="cart-item__remove" onClick={handleRemove} aria-label="Remove item">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
