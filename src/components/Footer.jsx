import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__content">
        <div className="footer__section">
          <h3>ElectroMart</h3>
          <p>Your one-stop shop for everything you need. Premium products, premium quality.</p>
        </div>
        <div className="footer__section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/products">Shop All</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/wishlist">Wishlist</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="/">Contact Us</a></li>
            <li><a href="/">FAQ</a></li>
            <li><a href="/">Shipping Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} ElectroMart. All rights reserved.</p>
      </div>
    </footer>
  );
}
