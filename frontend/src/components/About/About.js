import React from "react";
import "./About.css";
import image from "../../assets/logo-about.png";
import image1 from "../../assets/about-photo2.jpg";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function About() {
  return (
    <>
      <div style={{ backgroundColor: "#000000" }}>
        <Navbar />
      </div>
      <div className="about-header">
      <h1>Get to Know Us</h1>
      </div>
      <div className="about-background">
        <div className="heading">
          
          <p>
            {" "}
            Pizzatune is the place where you can indulge in delicious pizzas and
            experience a symphony of flavors with every bite.
          </p>
        </div>

        <div className="container">
          <section className="about">
            <div className="about-image">
              <img src={image} alt="Pizzeria Logo" />
            </div>

            <div className="about-content">
              <h2>Great Ambience & Taste</h2>
              <p>
                Pizzatune sets itself apart from other pizza brands with its
                unique selling proposition. We bake our pizzas with fresh dough
                and use premium quality ingredients, including 100% cow milk
                cheese and the purest form of in-house oregano and herbs. Our
                pizzas are 100% vegetarian for Gujarat, and we offer
                cheese-burst pizzas that are crispy, cheesy, and saucy. We
                believe that quality, taste, and service make the brand, and
                we’re committed to providing a customer-driven experience that
                keeps our customers coming back for more.
              </p>
            </div>
          </section>
          <section className="about">
            <div className="about-content">
              <h2>Our Mission</h2>
              <p>
                At Pizzatune, our mission is to redefine the pizza experience
                for our customers. We are committed to delivering not just
                pizzas, but a culinary journey filled with quality, taste, and
                innovation. With every slice, we aim to create moments of joy
                and satisfaction, leaving a lasting impression on our customers.
                We strive to source the finest ingredients, ensuring that each
                pizza is crafted with care and attention to detail. Our
                dedication to quality extends beyond our food; it encompasses
                every aspect of our service, from our inviting ambience to our
                friendly staff.
              </p>
            </div>
            <div className="about-image2">
              <img src={image1} alt="Pizzeria Logo" />
            </div>
          </section>
        </div>
      </div>
      <Footer/>
    </>
  );
}
