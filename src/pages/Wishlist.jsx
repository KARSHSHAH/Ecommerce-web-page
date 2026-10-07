import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';

export default function Wishlist() {
  const { state, dispatch, showToast } = useAppContext();

  if (state.wishlist.length === 0) {
    return (
      <div className="wishlist-page container empty-state">
        <Heart size={64} className="empty-icon" />
        <h2>Your wishlist is empty</h2>
        <p>Save items you love to your wishlist.</p>
        <Link to="/products" className="btn btn--primary">Explore Products</Link>
      </div>
    );
  }

  const handleMoveToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: item.id });
    showToast(`${item.name} moved to cart`);
  };

  const handleRemove = (item) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: item.id });
    showToast(`${item.name} removed from wishlist`);
  };

  return (
    <div className="wishlist-page container">
      <h1>My Wishlist</h1>
      <div className="wishlist-grid">
        {state.wishlist.map(item => (
          <div key={item.id} className="wishlist-item">
            <Link to={`/product/${item.id}`}>
              <img src={item.image} alt={item.name} className="wishlist-item__image" />
            </Link>
            <div className="wishlist-item__details">
              <Link to={`/product/${item.id}`}>
                <h4>{item.name}</h4>
              </Link>
              <p>${item.price.toFixed(2)}</p>
              <div className="wishlist-item__actions">
                <button className="btn btn--primary btn--small" onClick={() => handleMoveToCart(item)}>
                  <ShoppingCart size={16} /> Move to Cart
                </button>
                <button className="btn btn--icon" onClick={() => handleRemove(item)}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
