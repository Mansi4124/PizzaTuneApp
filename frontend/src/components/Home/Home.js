
import DivFlex from "../Desc/DivFlex";
import Offerdiv from "../Offer/Offerdiv";
import RowCol from "../PhotoGallary/RowCol";
import Test from "../Testimonial/TestimonialComponent";

import "./Home.css";
import CarouselNav from "../Carousel/CarouselNav";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <>
      <div className="home-container">
        {/* <Carousel /> */}
        <CarouselNav/>
        <DivFlex />
        <RowCol />
        <Offerdiv />
        <Test />
        <Footer/>
      </div>
    </>
  );
};

export default Home;
