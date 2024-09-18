import img1 from "../../assets/logo.jpg";
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; SameSite=Lax`;
}

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Function to check if the user is logged in
    const checkLoginStatus = () => {
      const userId = getCookie('userId'); // Assuming userId cookie indicates login
      if (userId) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };

    const getCookie = (name) => {
      const cookieName = `${name}=`;
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookies = decodedCookie.split(';');

      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
      return null;
    };

    checkLoginStatus();
  }, []); // Empty dependency array means this runs once on mount

  const handleSignOut = () => {
    deleteCookie("userId");
    setLoggedIn(false); // Update state to reflect logged-out status
    window.location.reload(); // Reload page to update UI
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg position-absolute top-0 w-100 z-2 ">
        <div className="container">
          <img src={img1} className="logoNav" alt="" />
          <a href="/" className="navbar-brand text-light">
            PIZZATUNE
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto d-flex justify-content-end w-100">
              <li className="nav-item">
                <a
                  href="/"
                  className="nav-link text-light text-center active"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="/about" className="nav-link text-light text-center">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a href="/menu" className="nav-link text-light text-center">
                  Menu
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/cutomerInquiry"
                  className="nav-link text-light text-center"
                >
                  Customer Inquiry
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/frenchiseInquiry"
                  className="nav-link text-light text-center"
                >
                  Franchise Enquiry
                </a>
              </li>

              {!loggedIn ? (
                <>
                  <li className="nav-item">
                    <a href="/login" className="nav-link text-light text-center">
                      Sign In
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/signup" className="nav-link text-light text-center">
                      Sign Up
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <FaUserCircle
                      className="profile-icon"
                      onClick={() => setMenuOpen(!menuOpen)}
                    />
                    {menuOpen && (
                      <div className="profile-menu">
                        <a href="/profile">My Profile</a>
                        <a href="/" onClick={handleSignOut}>Sign Out</a>
                      </div>
                    )}
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
