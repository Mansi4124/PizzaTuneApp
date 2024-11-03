import React from 'react';
import './Footer.css'; // Ensure this file contains your CSS styles

export default function Footer() {
  return (
    <footer className="row" id="f">
      <div className="col-lg-3 footer-div">
        <h6>USEFUL LINKS</h6>
        <a href="/"> <i className="fa-solid fa-angle-right fa-sm"></i> HOME</a><br />
        <a href="/about"> <i className="fa-solid fa-angle-right fa-sm"></i> ABOUT US</a><br />
        <a href="/menu"> <i className="fa-solid fa-angle-right fa-sm"></i> MENU</a><br />
        <a href="/customerInquiry"> <i className="fa-solid fa-angle-right fa-sm"></i> CUSTOMER ENQUIRY</a><br />
        <a href="/franchiseInquiry"> <i className="fa-solid fa-angle-right fa-sm"></i> FRANCHISE ENQUIRY</a><br />
      </div>
      <div className="col-lg-3">
        <h6>CONTACT</h6>
        <p> <i className="fa-solid fa-location-dot fa-sm"></i> Ahmedabad</p>
        <p> <i className="fa-solid fa-phone fa-sm"></i> 9313501512</p>
        <p className="social-icons">
          <a href="#"><i className="fa-brands fa-twitter"></i></a>
          <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#"><i className="fa-brands fa-instagram"></i></a>
        </p>
      </div>
      <div className="col-lg-3">
        <h6>TIMINGS</h6>
        <p><em>MORNING</em> 11AM TO 3PM</p>
        <p><em>EVENING</em> 6PM TO 1AM</p>
      </div>
      <div className="col-lg-3">
        <h6>ENJOY YOUR FOOD</h6>
        <p>Will provide you the best menu items and great taste with love</p>
        
      </div>
    </footer>
  );
}
