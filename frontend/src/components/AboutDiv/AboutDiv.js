import React from 'react';
import './AboutDiv.css'; // Import the CSS file
import { Link } from "react-router-dom";
const AboutDiv = () => {
  return (
    <div className="about-container mt-5">
      <div className="row">
        {/* Card 1 */}
        <div className="col-md-6 mb-4">
          <div className="card custom-card card-about">
            <div className="card-body">
              <h5 className="card-title custom-title">Discover Delicious Pizzas</h5>
              <p className="card-text custom-text">
                Explore a wide variety of mouthwatering pizzas made with the finest ingredients. From classic Margherita to unique gourmet options, our menu has something for everyone.
              </p>
              <button
                  type="button"
                  className="btn  btn-outline-light shadow"
                >
                  <Link to="/menu" className="btn-link " style={{ textDecoration: 'none' , color:'black',fontWeight:'bolder',margin: '10px'}}>
                    <div className="discover">Discover Menu</div>
                  </Link>
                </button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-6 mb-4">
          <div className="card custom-card card-about">
            <div className="card-body">
              <h5 className="card-title custom-title">An Unforgettable Dining Experience</h5>
              <p className="card-text custom-text">
                Enjoy a cozy ambiance with friendly service, perfect for a casual meal or special occasion. Our team is dedicated to providing a delightful dining experience for all our guests.
              </p>

              <button
                  type="button"
                  className="btn  btn-outline-light shadow"
                >
                  <Link to="/contact" className="btn-link " style={{ textDecoration: 'none' , color:'black',fontWeight:'bolder',margin: '10px'}}>
                    <div className="discover">Contact Us</div>
                  </Link>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDiv;
