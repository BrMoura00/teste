// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/" activeClassName="active">
        <i className="icon-home"></i>
      </NavLink>
      <NavLink to="/candidates" activeClassName="active">
        <i className="icon-users"></i>
      </NavLink>
      <NavLink to="/calendar" activeClassName="active">
        <i className="icon-calendar"></i>
      </NavLink>
      <NavLink to="/messages" activeClassName="active">
        <i className="icon-messages"></i>
      </NavLink>
      <NavLink to="/profile" activeClassName="active">
        <i className="icon-profile"></i>
      </NavLink>
      <NavLink to="/settings" activeClassName="active">
        <i className="icon-settings"></i>
      </NavLink>
    </div>
  );
};

export default Sidebar;
