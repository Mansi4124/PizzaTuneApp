import React from "react";
import "./Offerdiv.css";

import offer2 from "../../assets/pizza16_coupon.jpg";
import offer1 from "../../assets/pizza24.png";
export default function Offerdiv() {
  return (
    <>
      <div className="offer-coupon">
        <h4 className="offer-title">GREAT DEALS </h4>

        <div className="coupon-container">
          <img className="coupon-image" src={offer1} alt="mk"></img>
          <img className="coupon-image" src={offer2} alt="mk"></img>
        </div>
      </div>

    </>
  );
}
