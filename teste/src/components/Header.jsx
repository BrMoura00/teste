// src/components/Header.jsx
import React from 'react';

const Header = ({ setSearchTerm }) => {
  return (
    <header className="header">
      <h1>FisioTest</h1>
      <input
        type="search"
        placeholder="Procurar"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="user-profile">
        <img src="user-profile-image-url" alt="User " />
        <span> Breno</span>
      </div>
    </header>
  );
};

export default Header;
