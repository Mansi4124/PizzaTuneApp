import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu-list.css';

const MenuList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/menu/`);
        setItems(response.data.items);
      } catch (err) {
        setError('Error fetching menu items');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="menu-list">
      <h2>Menu Items</h2>
      <div className="menu-items">
        {items.map((item) => (
          <div key={item._id} className="menu-item">
            <img src={item.image_url} alt={item.name} className="menu-item-image" />
            <div className="menu-item-details">
              <h3 className="menu-item-name">{item.name}</h3>
              <p className="menu-item-description">{item.description}</p>
              <p className="menu-item-price">Price: ${item.price}</p>
              <p className="menu-item-category">Category: {item.category}</p>
              <p className="menu-item-veg">Vegetarian: {item.isVeg ? 'Yes' : 'No'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
