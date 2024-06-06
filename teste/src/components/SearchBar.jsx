// src/components/SearchBar.jsx
import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ setSearchTerm }) => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="search-bar">
      <h1>Pacientes</h1>
      <input
        type="search"
        placeholder="Procurar"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
