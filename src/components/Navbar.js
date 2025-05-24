import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Mi App</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/items">Productos</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;