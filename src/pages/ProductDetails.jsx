import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useAppContext } from '../hooks/useAppContext';
import Loader from '../components/Loader';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch, showToast } = useAppContext();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simulate fetch
    setLoading(true);
    const timer = setTimeout(() => {
      const found = products.find(p => p.id === parseInt(id));
      setProduct(found);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) return <Loader />;

  if (!product) {
    return (
      <div className="container empty-state">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')} className="btn btn--primary">Back to Products</button>
      </div>
    );
  }

  const isWishlisted = state.wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: quantity - 1 } }); // quantity logic in reducer needs raw product
    // Wait, reducer does: existing ? quantity + 1 : quantity 1. If we want custom quantity, we should handle it better.
    // Let's adapt our reducer logic or just dispatch multiple times / or update our logic for ADD_TO_CART payload.
    // Actually, let's just add a custom ADD_ITEM_WITH_QUANTITY or update reducer.
    // We will just update quantity after adding.
    dispatch({ type: 'ADD_TO_CART', payload: product });
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: product.id, quantity } });
    showToast(`${product.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
    showToast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="product-details container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Back
      </button>

      <div className="product-details__grid">
        <div className="product-details__image-container">
          <img src={product.image} alt={product.name} className="product-details__image" />
        </div>
        
        <div className="product-details__info">
          <span className="product-details__category">{product.category}</span>
          <h1 className="product-details__title">{product.name}</h1>
          <div className="product-details__rating">
            <Star size={20} fill="#fbbf24" stroke="#fbbf24" />
            <span>{product.rating}</span>
          </div>
          <p className="product-details__price">${product.price.toFixed(2)}</p>
          <p className="product-details__description">{product.description}</p>
          
          <div className="product-details__actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            
            <button className="btn btn--primary" onClick={handleAddToCart}>
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button 
              className={`btn btn--icon ${isWishlisted ? 'active-wishlist' : ''}`}
              onClick={handleToggleWishlist}
              aria-label="Wishlist"
            >
              <Heart size={24} fill={isWishlisted ? 'var(--primary-color)' : 'none'} stroke={isWishlisted ? 'var(--primary-color)' : 'currentColor'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
