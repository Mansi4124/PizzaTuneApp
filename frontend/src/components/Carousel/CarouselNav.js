import React from "react";
import "./CarouselNav.css";

import img2 from "../../assets/pizza28.jpg";
import img3 from "../../assets/pizza29.jpg";
import img4 from "../../assets/logo.jpg";
import img5 from "../../assets/pizza25.jpg";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function CarouselNav() {
  return (
    <div>
      <header>
        <Navbar />

        <div
          id="carouselExampleAutoplaying"
          className="carousel slide position-relative"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner h-100">
            <div className="carousel-item h-100 active">
              <img src={img3} className="d-block w-100" alt="img1" />

              <div className="carousel-caption h-100 d-flex flex-column justify-content-center">
                <img src={img4} className="logo" alt="img4" />
                <h1 className="fw-bold shadow text-center">PIZZATUNE</h1>
                <p className="w-100 text-start text-center d-none d-md-block fs-5 fw-light">
                  WHERE FLAVOUR MEETS HARMONY
                </p>
              </div>
            </div>
            <div className="carousel-item h-100">
              <img src={img2} className="d-block w-100" alt="img2" />
              <div className="carousel-caption h-100 d-flex flex-column justify-content-center align-items-start">
                <h2 className="fw-bold">Explore Menu!</h2>
                <p className="w-50 text-start d-none d-md-block fs-5 fw-light">
                  Discover a world of culinary delights that will tantalize your
                  taste buds!
                </p>

                <button
                  type="button"
                  className="btn  btn-outline-light shadow"
                >
                  <Link to="/menu" className="btn-link " style={{ textDecoration: 'none' , color:'orange',fontWeight:'bolder',margin: '10px'}}>
                    <div className="discover">Discover Menu</div>
                  </Link>
                </button>
              </div>
            </div>
            <div className="carousel-item h-100">
              <img src={img5} className="d-block w-100" alt="img3" />
              <div className="carousel-caption h-100 mt-6 d-flex flex-column justify-content-center align-items-end">
                <h2 className="fw-bold">Join Us</h2>
                <p className="w-50 text-end d-none d-md-block fs-4 ">
                  Let's make Pizzatune famous in the world
                </p>
                <button
                  type="button"
                  className="btn btn-dark btn-outline-light text-capitalize bu "
                >
                 <Link to="/frenchiseInquiry" className="btn-link " style={{ textDecoration: 'none' , color:'orange',fontWeight:'bolder',margin: '10px'}}>
                  <div className="discover1">Franchise Enquiry</div>
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </header>
    </div>
  );
}
