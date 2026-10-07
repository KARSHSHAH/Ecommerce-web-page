import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';

export default function Products() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [filters, setFilters] = useState({
    category: initialCategory,
    priceRange: 2000,
    sort: 'featured'
  });

  useEffect(() => {
    // Simulate API load
    setLoading(true);
    const timer = setTimeout(() => {
      let result = [...products];

      // Filter by Search
      if (searchQuery) {
        result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      // Filter by Category
      if (filters.category !== 'All') {
        result = result.filter(p => p.category === filters.category);
      }

      // Filter by Price
      result = result.filter(p => p.price <= filters.priceRange);

      // Sort
      switch (filters.sort) {
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'name':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          // featured - keep as is (mock)
          break;
      }

      setFilteredProducts(result);
      setLoading(false);
    }, 600); // fake network delay
    return () => clearTimeout(timer);
  }, [filters, searchQuery]);

  return (
    <div className="products-page container">
      <div className="products-page__header">
        <h1>All Products</h1>
        <SearchBar onSearch={setSearchQuery} />
      </div>
      
      <div className="products-page__content">
        <FilterSidebar categories={categories} filters={filters} setFilters={setFilters} />
        
        <main className="products-page__main">
          {loading ? (
            <div className="product-skeleton-grid">
               {/* Skeletons */}
               {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton-card"></div>)}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No products found</h2>
              <p>Try adjusting your filters or search query.</p>
              <button className="btn btn--primary" onClick={() => {
                setFilters({ category: 'All', priceRange: 2000, sort: 'featured' });
                setSearchQuery('');
              }}>Clear Filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
