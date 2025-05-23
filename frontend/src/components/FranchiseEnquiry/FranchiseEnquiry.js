import { React, useState } from "react";
import "./FranchiseEnquiry.css";
import f1 from '../../assets/f1.jpg';
import f2 from '../../assets/f2.jpg';
import f3 from '../../assets/f3.jpg';
import f4 from '../../assets/f4.jpg';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from 'axios';

export default function FranchiseEnquiry() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    message: "",
    adminReply: ""
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact/submit-frenchise-inquiry/`, formData);
      const data = response.data;
      console.log(data)
    
    } catch (error) {
      console.error("Error submitting form:", error);
     
    }
  };

  return (
    <>
      <Navbar />
      <div className="franchiseContainer">
        <div className="franchiseBox">
          <h1 className="FranchiseTitle">Franchise Enquiry</h1>
          <div className="franchiseGrid">
            <div className="row">
              <div className="col-md-3">
                <img src={f1} alt="Franchise 1" className="f-img1" />
                <div className="FranchiseDiv1">
                  We provide a meticulously structured training program tailored
                  for both franchise owners and their staff. This ensures a
                  standardized and pertinent operational model that benefits all
                  of our investors.
                </div>
              </div>
              <div className="col-md-3">
                <img src={f2} alt="Franchise 2" />
                <div className="FranchiseDiv1">
                  We empower you with business autonomy as a franchise owner
                  while extending the invaluable support of our reputable brand
                  and a well-established network of experienced professionals.
                </div>
              </div>
              <div className="col-md-3">
                <img src={f3} alt="Franchise 3" />
                <div className="FranchiseDiv1">
                  Pizzatune is a subsidiary brand of the esteemed NSW group
                  which has global recognition. Consequently, our franchise
                  benefits from the full spectrum of group resources,
                  encompassing workforce, advanced software solutions,
                  comprehensive marketing strategies, impactful advertising, and
                  branding expertise.
                </div>
              </div>
              <div className="col-md-3">
                <img src={f4} alt="Franchise 4" />
                <div className="FranchiseDiv1">
                  Our streamlined procurement system facilitates the acquisition
                  of essential ingredients at competitive rates. Coupled with
                  lower operational costs, this translates into an optimal
                  return on your investment.
                </div>
              </div>
            </div>

            <form className="franchiseForm" onSubmit={handleSubmit} method="post">
              <fieldset>
                <div className="form-group">
                  <input
                    type="text"
                    name="customerName"
                    required
                    placeholder="Enter Your Name"
                    value={formData.customerName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="customerEmail"
                    placeholder="Enter Your Email"
                    required
                    value={formData.customerEmail}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Enter Your Message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button type="submit">Submit</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
