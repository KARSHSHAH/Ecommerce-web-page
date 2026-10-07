import React from 'react';

export default function FilterSidebar({ categories, filters, setFilters }) {
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFilters(prev => ({
      ...prev,
      category: value === prev.category ? 'All' : value
    }));
  };

  const handlePriceChange = (e) => {
    setFilters(prev => ({ ...prev, priceRange: e.target.value }));
  };

  const handleSortChange = (e) => {
    setFilters(prev => ({ ...prev, sort: e.target.value }));
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-group">
        <h4 className="filter-title">Categories</h4>
        <div className="filter-options">
          <label className="radio-label">
            <input 
              type="radio" 
              name="category" 
              value="All" 
              checked={filters.category === 'All'}
              onChange={handleCategoryChange}
            />
            All Categories
          </label>
          {categories.map(cat => (
            <label key={cat} className="radio-label">
              <input 
                type="radio" 
                name="category" 
                value={cat} 
                checked={filters.category === cat}
                onChange={handleCategoryChange}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4 className="filter-title">Max Price: ${filters.priceRange}</h4>
        <input 
          type="range" 
          min="0" 
          max="2000" 
          step="10"
          value={filters.priceRange}
          onChange={handlePriceChange}
          className="price-slider"
        />
      </div>

      <div className="filter-group">
        <h4 className="filter-title">Sort By</h4>
        <select value={filters.sort} onChange={handleSortChange} className="sort-select">
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>
    </aside>
  );
}
