// src/components/SearchBar.jsx
import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ setSearchTerm }) => {
  const [filter, setFilter] = useState('All');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  return (
    <div className="search-bar">
      <div className={`search-container ${isExpanded ? 'expanded' : ''}`}>
        <i className="icon-search" onClick={handleExpand}></i>
        <input
          type="search"
          placeholder="Procurar"
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={handleCollapse}
        />
      </div>
      <div className="filters">
        <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>
          Todos
        </button>
        <button onClick={() => setFilter('In-House')} className={filter === 'In-House' ? 'active' : ''}>
          Maiores Rates
        </button>
        <button onClick={() => setFilter('Remote')} className={filter === 'Remote' ? 'active' : ''}>
          Remoto
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
