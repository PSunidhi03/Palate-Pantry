import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/header.css';
import { useAuth } from '../Auth/AuthContext';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="header-container">
      <div className="container">
        <div className="header-content row align-items-center">
          <div className="logo col-6 col-md-3 d-flex align-items-center">
            <img src="/src/assets/logo.png" alt="Palate-Pantry Logo" className="logo-img" />
            <span className="logo-text">Palate-Pantry</span>
          </div>
          <nav className="header-nav col-12 col-md-6 d-flex justify-content-center justify-content-md-center">
            <a href="/home" className="header-link">Home</a>
            <a href="/about-us" className="header-link">About us</a>
            <a href="/recipe" className="header-link">Meals</a>
            <a href="/pantry" className="header-link">Pantry</a>
            <a href="/final-cart" className="header-link">my cart</a>
          </nav>
          <div className="login-signup col-6 col-md-3 d-flex justify-content-end">
            {isAuthenticated ? (
              <div className="user-info d-flex align-items-center">
                <span className="user-name">{user.username}</span>
                <button onClick={logout} className="btn btn-light ml-3">Logout</button>
              </div>
            ) : (
              <a href="/signin" className="btn btn-light">Login/Signup</a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
