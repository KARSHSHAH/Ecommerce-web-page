import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';

export default function ProductCard({ product }) {
  const { state, dispatch, showToast } = useAppContext();

  const isWishlisted = state.wishlist.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', payload: product });
    showToast(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
    showToast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__image-container">
        <img src={product.image} alt={product.name} className="product-card__image" loading="lazy" />
        <button 
          className={`product-card__wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleToggleWishlist}
          aria-label="Toggle wishlist"
        >
          <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="product-card__content">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__title">{product.name}</h3>
        <div className="product-card__rating">
          <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
          <span>{product.rating}</span>
        </div>
        <div className="product-card__bottom">
          <span className="product-card__price">${product.price.toFixed(2)}</span>
          <button className="btn btn--icon" onClick={handleAddToCart} aria-label="Add to cart">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </Link>
  );
}
