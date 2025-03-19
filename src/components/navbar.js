import React from 'react';
import logo from '../assets/logo.svg';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import './navbar.css';


const Navbar = ({ scrollToSection, refs }) => {
  const { aboutRef, productsRef, communityRef, educationRef, contactRef } = refs;
  const location = useLocation(); // Get the current route

  // Helper function to handle scroll if on home page
  const handleScroll = (ref) => {
    if (location.pathname === '/' && ref?.current) {
      scrollToSection(ref);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={logo}
          alt="Stockify Logo"
          className="navbar-logo"
        />
        <span className="company-name">Stockify</span>
      </div>

      <div className="navbar-center">
        <Link to="/" onClick={() => handleScroll(aboutRef)}>
          <button>About</button>
        </Link>
        <Link to="/" onClick={() => handleScroll(productsRef)}>
          <button>Products</button>
        </Link>
        <Link to="/" onClick={() => handleScroll(educationRef)}>
          <button>Education</button>
        </Link>
        <Link to="/" onClick={() => handleScroll(communityRef)}>
          <button>Community</button>
        </Link>
        <Link to="/" onClick={() => handleScroll(contactRef)}>
          <button>Contact</button>
        </Link>
      </div>

      <div className="navbar-right">
        <a href="#login" className="login-link">Log In</a>
        <a href="#get-started" className="get-started-button">Get Started</a>
      </div>
    </nav>
  );
};

export default Navbar;