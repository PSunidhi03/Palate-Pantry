import React from 'react'
import Mansalva from 'react-google-fonts';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/header.css'

function Header() {
  return (
     <header className="header-container">
      <div className="container">
        <div className="header-content row align-items-center">
          <div className="logo col-6 col-md-3 d-flex align-items-center">
            <img src="/src/assets/logo.png" alt="Palate-Pantry Logo" className="logo-img" />
            <span className="logo-text">Palate-Pantry</span>
          </div>
          <nav className="header-nav col-12 col-md-6 d-flex justify-content-center justify-content-md-center">
            <a href="#home" className="header-link">Home</a>
            <a href="#services" className="header-link">Our Services</a>
            <a href="#about" className="header-link">About Us</a>
            <a href="#news" className="header-link">What's new?</a>
          </nav>
          <div className="login-signup col-6 col-md-3 d-flex justify-content-end">
            <a href="#login" className="btn btn-light">Login/Signup</a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
