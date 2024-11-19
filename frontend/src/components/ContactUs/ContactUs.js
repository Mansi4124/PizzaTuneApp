import React, { useState } from "react";
import "./ContactUs.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";

export default function CustomerInquiry() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerQuery: ""
  });
  const [formErrors, setFormErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact/submit-inquiry/`, formData);
      const data = response.data;

      if (data.success) {
        setSuccessMessage(data.message);
        setFormData({ customerName: "", customerEmail: "", customerQuery: "" });
        setFormErrors(null);
      } else {
        setFormErrors(data.message);
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormErrors("An error occurred. Please try again.");
      setSuccessMessage(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="contactus">
        <form className="contactForm" onSubmit={handleSubmit}>
          <h1 className="contactusTitle">Get in touch</h1>
          <p>We are always happy to assist you in every way we can.</p>
          <div className="form-group">
            <input
              type="text"
              id="customerName"
              name="customerName"
              placeholder="Enter your name"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              placeholder="Enter your email"
              value={formData.customerEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              id="customerQuery"
              name="customerQuery"
              rows="4"
              placeholder="Enter your query"
              value={formData.customerQuery}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button className="btn btn-lg btn-dark btn-outline-light" type="submit">
            Submit
          </button>
          {formErrors && <p className="error">{formErrors}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
}
