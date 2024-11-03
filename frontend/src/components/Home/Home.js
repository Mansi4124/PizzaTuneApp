import React, { useEffect, useState } from "react";
import axios from "axios";
import DivFlex from "../Desc/DivFlex";

import RowCol from "../PhotoGallary/RowCol";
import Test from "../Testimonial/TestimonialComponent";
import CarouselNav from "../Carousel/CarouselNav";
import Footer from "../Footer/Footer";
import AboutDiv from "../AboutDiv/AboutDiv";
import "./Home.css";
import NewsUpdates from "../NewsUpdate/NewsUpdate";

const Home = () => {
  const [topSellingItems, setTopSellingItems] = useState([]);

  useEffect(() => {
    fetchOrders(); // Fetch the orders when the component mounts
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/order/get_orders/');
      if (response.status === 200) {
        const orders = response.data.orders;
        const topItems = calculateTopSellingItems(orders);
        setTopSellingItems(topItems);
        console.log("Top Selling Items:", topItems); // Log top selling items
      }
    } catch (err) {
      console.error('An error occurred while fetching orders', err);
    }
  };

  const calculateTopSellingItems = (orders) => {
    const itemCounts = {};
  
    orders.forEach((order) => {
      order.cartItems.forEach((item) => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + item.qty;
      });
    });
  
    const sortedItems = Object.keys(itemCounts)
      .map((name) => ({ name, quantity: itemCounts[name] }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 4);
  
    return sortedItems;
  };
  
  console.log("State of topSellingItems:", topSellingItems); // Log the state

  return (
    <div className="home-container">
      <CarouselNav />
      <DivFlex />
      {/* Pass topSellingItems to RowCol component */}
      <RowCol topSellingItems={topSellingItems} />
      <AboutDiv />
      <Test />
      <NewsUpdates />
      <Footer />
    </div>
  );
};
export default Home;