import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, LogOut } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';

export default function Navbar() {
  const { state, dispatch, showToast } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    showToast('Logged out successfully', 'success');
    navigate('/');
  };

  const cartCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar__container container">
        <Link to="/" className="navbar__logo">
          Electro<span>Mart</span>
        </Link>

        <div className="navbar__search-wrapper">
          <Link to="/products" className="navbar__search-link">
            <Search size={20} />
            <span>Search products...</span>
          </Link>
        </div>

        <ul className="navbar__links">
          <li>
            <Link to="/products" className="navbar__link">Products</Link>
          </li>
          <li>
            <Link to="/wishlist" className="navbar__icon-link">
              <Heart size={24} />
              {state.wishlist.length > 0 && (
                <span className="navbar__badge">{state.wishlist.length}</span>
              )}
            </Link>
          </li>
          <li>
            <Link to="/cart" className="navbar__icon-link">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="navbar__badge">{cartCount}</span>
              )}
            </Link>
          </li>
          {state.user ? (
            <li className="navbar__user-menu">
              <span className="navbar__user-name">Hi, {state.user.name}</span>
              <button onClick={handleLogout} className="navbar__icon-link" aria-label="Logout">
                <LogOut size={24} />
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="navbar__icon-link">
                <User size={24} />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
