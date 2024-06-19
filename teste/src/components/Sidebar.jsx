import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? '<' : '>'}
      </button>
      {isOpen && (
        <>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            <i className="icon-home"></i>
          </NavLink>
          <NavLink to="/calendar" className={location.pathname === '/calendar' ? 'active' : ''}>
            <i className="icon-calendar"></i>
          </NavLink>
          <NavLink to="/exercises" className={location.pathname === '/exercises' ? 'active' : ''}>
            <i className="icon-gym"></i>
          </NavLink>
          <NavLink to="/running" className={location.pathname === '/running' ? 'active' : ''}>
            <i className="icon-running"></i>
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;
