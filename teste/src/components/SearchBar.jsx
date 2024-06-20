import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ setSearchTerm }) => {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(false);

  const handleSearchIconClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="search-bar">
      <div className="search-icon" onClick={handleSearchIconClick}>
        <Search size={24} />
      </div>
      <input
        type="search"
        placeholder="Procurar"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: expanded ? '200px' : '0', visibility: expanded ? 'visible' : 'hidden' }}
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
