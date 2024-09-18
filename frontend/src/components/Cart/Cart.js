// src/components/Cart/Cart.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

import './Cart.css';

const saveOrderDetails = async () => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

const Cart = ({ cartProps, setIsCartOpen, updateCartItem, removeItemFromCartCompletely, updateMenuItemQuantity }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDecreaseQuantity = (item) => {
    if (item.qty > 1) {
      updateCartItem(item, item.qty - 1);
      updateMenuItemQuantity(item._id, item.qty - 1);
    } else {
      removeItemFromCartCompletely(item);
    }
  };

  const handleIncreaseQuantity = (item) => {
    updateCartItem(item, item.qty + 1);
    updateMenuItemQuantity(item._id, item.qty + 1);
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await saveOrderDetails();
      navigate('/order', { state: { cartItems: cartProps, totalAmount } });
    } catch (err) {
      setError('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount = cartProps.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="cart-container">
          <div className="back-cart-container" onClick={() => setIsCartOpen(false)}>
            <div className="back-cart">
              <i className="fas fa-arrow-left"></i> Back
            </div>
          </div>
         
          <h3 className='cart-title' >Your Cart</h3>
          <button className="place-order-button" onClick={handlePlaceOrder} disabled={isLoading}>
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </button>
         
          
          <table className="cart-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartProps.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>Rs.{item.price}</td>
                  <td className="quantity-column">
                    <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                    {item.qty}
                    <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                  </td>
                  <td>Rs. {(item.qty * item.price).toFixed(2)}</td>
                  <td>
                    <button className="remove-item-button" onClick={() => removeItemFromCartCompletely(item)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-total">
            <h3>Total: Rs. {totalAmount.toFixed(2)}</h3>
          </div>
          {error && <p className="error-message">{error}</p>}
        
        </div>
       
      </div>
    </>
  );
};

export default Cart;
