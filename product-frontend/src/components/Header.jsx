import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a href="/" className="logo">ShopEase</a>
          
          <button 
            className={`mobile-menu-btn ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            <a href="/" className="nav-link">Home</a>
            <a href="/products" className="nav-link">Products</a>
            <a href="/cart" className="nav-link">Cart</a>
            <a href="/admin" className="nav-link">Admin</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;