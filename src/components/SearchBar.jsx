import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  return (
    <div className="search-bar">
      <Search size={20} className="search-bar__icon" />
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-bar__input"
      />
    </div>
  );
}
