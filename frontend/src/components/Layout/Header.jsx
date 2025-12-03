import React from 'react';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">
            <i className="fas fa-shield-alt"></i>
          </div>
          <div>
            <h1>Secure <span>PDF Converter</span></h1>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>By Kelompok 6 - PBO C</p>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#home"><i className="fas fa-home"></i> Beranda</a>
          <a href="#features"><i className="fas fa-star"></i> Fitur</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;