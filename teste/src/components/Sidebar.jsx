import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, Dumbbell, X,PanelRightClose  } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <PanelRightClose  size={24} />}
      </button>
      <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
        <Home size={24} />
      </NavLink>
      <NavLink to="/calendar" className={location.pathname === '/calendar' ? 'active' : ''}>
        <Calendar size={24} />
      </NavLink>
      <NavLink to="/exercises" className={location.pathname === '/exercises' ? 'active' : ''}>
        <Dumbbell size={24} />
      </NavLink>
    </div>
  );
};

export default Sidebar;
