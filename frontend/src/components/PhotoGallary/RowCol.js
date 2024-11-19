import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RowCol.css";

export default function RowCol({ topSellingItems }) {
  const [items, setItems] = useState([]);
  const [topItems, setTopItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/menu/`);
        const allItems = response.data.items || []; // Ensure it defaults to an empty array
        
        // Filter items based on topSellingItems names
        const filteredTopItems = allItems.filter(item => 
          topSellingItems.some(topItem => topItem.name === item.name)
        );
        
        setTopItems(filteredTopItems);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    if (topSellingItems && topSellingItems.length > 0) {
      fetchItems();
    }
  }, [topSellingItems]);

  if (!topItems || topItems.length === 0) {
    return <p>No top-selling items available at the moment.</p>; // Fallback for no data
  }

  return (
    <div className="popular">
      <h4 className="popular-title">TOP SELLING</h4>

      <div className="row popular-items">
        {topItems.map((item, index) => (
          <div key={index} className="col-lg-3 image-container"> {/* Adjusting for four items */}
            <img
              src={item.image_url}
              className="image1"
              alt={item.name}
            />
            <div className="image-text">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
