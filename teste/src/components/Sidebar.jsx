import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
        <i className="icon-home"></i>
      </NavLink>
      <NavLink to="/patients" className={location.pathname === '/patients' ? 'active' : ''}>
        <i className="icon-users"></i>
      </NavLink>
      <NavLink to="/calendar" className={location.pathname === '/calendar' ? 'active' : ''}>
        <i className="icon-calendar"></i>
      </NavLink>
      <NavLink to="/messages" className={location.pathname === '/messages' ? 'active' : ''}>
        <i className="icon-messages"></i>
      </NavLink>
      <NavLink to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
        <i className="icon-profile"></i>
      </NavLink>
      <NavLink to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
        <i className="icon-settings"></i>
      </NavLink>
    </div>
  );
};

export default Sidebar;
