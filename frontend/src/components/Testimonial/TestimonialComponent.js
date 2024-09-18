import "./TestimonialComponent.css";
const TestimonialComponent = () => {
  return (
    <main className="test-container">
      <h6>What others say?</h6>
      <h3>REVIEWS</h3>
      <div
        id="testimonialCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="2500"
      >
        <div className="carousel-indicators">
          <button
            id="b1"
            data-bs-target="#testimonialCarousel"
            data-bs-slide-to="0"
          ></button>
          <button
            id="b2"
            data-bs-target="#testimonialCarousel"
            data-bs-slide-to="1"
          ></button>
          <button
            id="b3"
            data-bs-target="#testimonialCarousel"
            data-bs-slide-to="2"
            className="active"
          ></button>
          <button
            id="b4"
            data-bs-target="#testimonialCarousel"
            data-bs-slide-to="3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item">
            <div className="row">
              <div className="col d-none d-lg-block">
                <div className="testimonial-card">
                  <span className="quote-icon">
                    <i className="fas fa-quote-left fa-lg"></i>
                  </span>
                  <p className="testimonial-text">Great service and ambience</p>
                  <div className="testimonial-info">
                    <div className="testimonial-image">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="testimonial-details">
                      <h4>Jay Patel</h4>
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="testimonial-card active-card">
                  <span className="quote-icon">
                    <i className="fas fa-quote-left fa-lg"></i>
                  </span>
                  <p className="testimonial-text">
                    Amazing food it was.we ordered delicious 9-cheesy pizza 
                  </p>
                  <div className="testimonial-info">
                    <div className="testimonial-image">
                    <i className="fas fa-user"></i>
                    </div>
                    <div className="testimonial-details">
                      <h4>Suman Sood</h4>
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col d-none d-lg-block">
                <div className="testimonial-card">
                  <span className="quote-icon">
                    <i className="fas fa-quote-left fa-lg"></i>
                  </span>
                  <p className="testimonial-text">
                    Nice interior and delicious food
                  </p>
                  <div className="testimonial-info">
                    <div className="testimonial-image">
                    <i className="fas fa-user"></i>
                    </div>
                    <div className="testimonial-details">
                      <h4>Jyoti Dave</h4>
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row">
              <div className="col d-none d-lg-block">
                <div className="testimonial-card">
                  <span className="quote-icon">
                    <i className="fas fa-quote-left fa-lg"></i>
                  </span>
                  <p className="testimonial-text">
                    Loved the place
                  </p>
                  <div className="testimonial-info">
                    <div className="testimonial-image">
                    <i className="fas fa-user"></i>
                    </div>
                    <div className="testimonial-details">
                      <h4>Abhira Sharma</h4>
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="testimonial-card active-card">
                  <span className="quote-icon">
                    <i className="fas fa-quote-left fa-lg"></i>
                  </span>
                  <p className="testimonial-text">
                  The elegant ambiance was perfect for our meeting, and the staff ensured everything ran smoothly
                  </p>
                  <div className="testimonial-info">
                    <div className="testimonial-image">
                    <i className="fas fa-user"></i>
                    </div>
                    <div className="testimonial-details">
                      <h4>Aman Modi</h4>
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col d-none d-lg-block">
                <div className="testimonial-card">
                  <span className="quote-icon">
                    <i className="fas fa-quote-left fa-lg"></i>
                  </span>
                  <p className="testimonial-text">
                    Must visit place for pizza lovers! 
                  </p>
                  <div className="testimonial-info">
                    <div className="testimonial-image">
                    <i className="fas fa-user"></i>
                    </div>
                    <div className="testimonial-details">
                      <h4>Athrva Shah</h4>
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item active">
            <div className="row">
              <div className="col d-none d-lg-block">
                <div className="testimonial-card">
                  <span className="quote-icon">
                    <i className="fas fa-quote-left fa-lg fa-lg"></i>
                  </span>
                  <p className="testimonial-text">
                  The restaurant has a cozy atmosphere and the food is simply amazing.
                  </p>
                  <div className="testimonial-info">
                    <div className="testimonial-image">
                    <i className="fas fa-user"></i>
                    </div>
                    <div className="testimonial-details">
                      <h4>Harshad Agrawal</h4>
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="testimonial-card active-card">
                  <span className="quote-icon">
                    <i className="fas fa-quote-left fa-lg fa-lg"></i>
                  </span>
                  <p className="testimonial-text">
                  I celebrated my birthday here, and it was an unforgettable experience!    </p>
                  <div className="testimonial-info">
                    <div className="testimonial-image">
                    <i className="fas fa-user"></i>
                    </div>
                    <div className="testimonial-details">
                      <h4>Rajesh Wagle</h4>
                      <div classNameName="reviews">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col d-none d-lg-block">
                <div className="testimonial-card">
                  <span className="quote-icon">
                    <i className="fas fa-quote-left fa-lg"></i>
                  </span>
                  <p className="testimonial-text">
                  The restaurant has a charming ambiance and the menu offers a great variety of dishes
                  </p>
                  <div className="testimonial-info">
                    <div className="testimonial-image">
                    <i className="fas fa-user"></i>
                    </div>
                    <div className="testimonial-details">
                      <h4>Anjali Patel</h4>
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row">
              <div className="col d-none d-lg-block">
                <div className="testimonial-card">
                  <span className="quote-icon">
                    <i className="fas fa-quote-left fa-lg"></i>
                  </span>
                  <p className="testimonial-text">
                  Great place for a family dinner! 
                  </p>
                  <div className="testimonial-info">
                    <div className="testimonial-image">
                    <i className="fas fa-user"></i>
                    </div>
                    <div className="testimonial-details">
                      <h4>Mamta Sharma</h4>
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="testimonial-card active-card">
                  <span className="quote-icon">
                    <i className="fas fa-quote-left fa-lg"></i>
                  </span>
                  <p className="testimonial-text">
                  I had a wonderful dining experience here. The food was exquisite and the service was top-notch
                  </p>
                  <div className="testimonial-info">
                    <div className="testimonial-image">
                    <i className="fas fa-user"></i>
                    </div>
                    <div className="testimonial-details">
                      <h4>Ananya Bhatt</h4>
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col d-none d-lg-block">
                <div className="testimonial-card">
                  <span className="quote-icon">
                    <i className="fas fa-quote-left fa-lg"></i>
                  </span>
                  <p className="testimonial-text">
                  Excellent service and atmosphere. Highly recommended!
                  </p>
                  <div className="testimonial-info">
                    <div className="testimonial-image">
                    <i className="fas fa-user"></i>
                    </div>
                    <div className="testimonial-details">
                      <h4>Rashmi Gupta</h4>
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TestimonialComponent;
