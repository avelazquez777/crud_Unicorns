import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/unicorn.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <h2 className="logo">🦄 Unicorn Manager</h2>
      </Link>
      <div className="links">
        <Link to="/" className="link">Inicio</Link>
        <Link to="/unicornios" className="link">Unicornios</Link>
        <Link to="/productos" className="link">Productos</Link>
      </div>
    </nav>
  );
};

export default Navbar;
