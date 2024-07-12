import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/footer.css'
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <img src="/src/assets/logo.png" alt="Logo" className="footer-logo" />
          </div>
          <div className="col-md-6">
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#team">Team</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <div className="footer-search">
              <input type="text" placeholder="Search..." />
              <button type="submit"><i className="fa fa-search"></i></button>
            </div>
            <div className="footer-social">
              <a href="#facebook"><i className="fa fa-facebook"></i></a>
              <a href="#twitter"><i className="fa fa-twitter"></i></a>
              <a href="#instagram"><i className="fa fa-instagram"></i></a>
              <a href="#linkedin"><i className="fa fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="footer-legal">
              <li><a href="#privacy-policy">Privacy Policy</a></li>
              <li><a href="#terms-of-use">Terms of Use</a></li>
              <li><a href="#sales-and-refunds">Sales and Refunds</a></li>
              <li><a href="#legal">Legal</a></li>
              <li><a href="#site-map">Site Map</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
