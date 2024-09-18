import React from "react";
import "./Carousel.css";
import image from './../assets/logo.jpg'
export default function Carousel() {
  return (
    <div className="background-div">
      <div className="container">
        <div id="demo" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="t carousel-item active  ">
              <img src={image} className="img1 mx-auto d-block" />
              <div className="carousel-caption text ">
                <h2 className="text-light">

                  Welcome to Pizatune – Where Flavor Meets Harmony!
                </h2>
              </div>
            </div>
            <div className="t4 carousel-item  ">
            {/* <div className="mainDiv d-flex ">
      <div className="subDiv  flex-fill">100% fresh 🍕</div>
      <div className="subDiv flex-fill">Friendly service 😊</div>
      <div className="subDiv  flex-fill">Premium Quality ⭐️</div>
    </div> */}
     <div className="offer ">
        <div className=" flex-fill carousel-21">
            <img
                        src="pizza_offer4.jpg"
                        alt="PizzaTune"
                        className="img2"
              />

          </div>
        <div className=" flex-fill carousel-22">
              <h1 className="offer-h3">BOGO OFFER</h1>
                  <h2 className="carousel-h2">BUY ONE & GET ONE FREE </h2>
                  <button className="t1  ">
                    GET IT NOW
                  </button>
        </div>
        
    </div>
    </div>
              {/* <div className="container">
                <img
                  src="pizza_offer4.jpg"
                  alt="PizzaTune"
                  className="img2"
                />
                {/* <img
                  src="pizza10.jpg"
                  alt="PizzaTune"
                  className="img3"
                /> */}
                {/* <h1 className="offer-h3">BOGO OFFER</h1>
                <h2 className="carousel-h2">BUY ONE & GET ONE FREE </h2>
                <button className="btn btn-lg t1 btn-danger ">
                  GET IT NOW
                </button>
              </div>
            </div> */}
          <div className="t3 carousel-item ">
              <div class="d-flex flex-column ">
                <div className="flex-div1">
                  Join us
                </div>
                <div className="flex-div2">
                  <button className="btn btn-light btn-lg btn-outline-dark">Franchise Enquiry</button>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#demo"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#demo"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
