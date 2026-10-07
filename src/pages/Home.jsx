import React from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const featuredProducts = products.filter(p => p.rating >= 4.8).slice(0, 4);

  return (
    <main className="home">
      <section className="hero">
        <div className="hero__content container">
          <h1 className="hero__title">Experience Premium Quality</h1>
          <p className="hero__subtitle">Discover our exclusive collection of electronics, clothing, and more.</p>
          <Link to="/products" className="btn btn--primary btn--large">Shop Now</Link>
        </div>
      </section>

      <section className="categories-section container">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map(cat => (
            <Link to={`/products?category=${cat}`} key={cat} className="category-card">
              <h3>{cat}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-section container">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      <section className="offers-section container">
        <div className="offer-banner">
          <div className="offer-banner__content">
            <h2>Special Offer!</h2>
            <p>Get 20% off on all Electronics this weekend. Don't miss out!</p>
            <Link to="/products?category=Electronics" className="btn btn--secondary">Shop Electronics</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
