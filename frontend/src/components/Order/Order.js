import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate and useLocation
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Order.css'; // Ensure you have styling for this component
import Cookies from 'js-cookie';

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate
  const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 }; // Retrieve order details from location state

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Store user's email
  const [error, setError] = useState(null);
  const [isFormDirty, setIsFormDirty] = useState(false); // Track if the form is "dirty" (cart has items)

  const userid = Cookies.get('userId'); // Get userId from cookies

  useEffect(() => {
    if (userid) {
      fetchUserDetails(userid); // Fetch user details using the userId from cookie
    } else {
      setError('User ID is not available.');
    }
  }, [userid]);

  // Fetch the user details including the email from the backend
  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.post('http://localhost:8000/get_customer_data/', { user_id: userid });
      if (response.status === 200) {
        const user = response.data.user;
        if (user) {
          setUsername(`${user.fname} ${user.lname}`);
          setEmail(user.email); // Save email to state
        } else {
          setUsername('No name available');
          setEmail(''); // Clear email if no user found
        }
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching user data');
    }
  };

  // Handle browser/tab closing
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isFormDirty) {
        e.preventDefault();
        e.returnValue = ''; // Trigger the browser confirmation dialog
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isFormDirty]);

  // Handle back or navigation away manually using the navigate function
  useEffect(() => {
    const handleNavigation = (e) => {
      if (isFormDirty) {
        e.preventDefault();
        const confirmLeave = window.confirm('Are you sure you want to discard your order?');
        if (confirmLeave) {
          navigate(-1); // If confirmed, go back to the previous page
        }
      } else {
        navigate(-1); // Navigate without confirmation if no changes
      }
    };

    // Bind the back button event listener
    window.addEventListener('popstate', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation); // Cleanup on unmount
    };
  }, [isFormDirty, navigate]);

  // Mark the form as dirty if there are items in the cart
  useEffect(() => {
    if (cartItems.length > 0) {
      setIsFormDirty(true);
    }
  }, [cartItems]);

  // Function to send the bill
  const sendBill = async () => {
    try {
      const response = await axios.post('http://localhost:8000/send_bill/', {
        email: email,
        cartItems: cartItems,
        totalAmount: totalAmount,
      });
  
      if (response.status === 200) {
        alert('Bill sent successfully!');
      } else {
        alert('Failed to send the bill.');
      }
    } catch (error) {
      console.error('An error occurred while sending the bill:', error);
      alert('An error occurred while sending the bill.');
    }
  };
  

  return (
    <>
      <Navbar />
      <h2 className='order-title'>Your Bill</h2>
      <div className="order-page">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="order-user">
          <h3>Name: {username || 'Loading...'}</h3>
        </div>
        <div className="order-summary">
          <div className="order-items">
            {/* Header Row */}
            <div className="order-item-header">
              <div className="order-item-name">Name</div>
              <div className="order-item-quantity">Quantity</div>
              <div className="order-item-price">Price</div>
              <div className="order-item-total">Total</div>
            </div>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className="order-item">
                  <div className="order-item-name">{item.name}</div>
                  <div className="order-item-quantity">{item.qty}</div>
                  <div className="order-item-price">Rs.{item.price}</div>
                  <div className="order-item-total">Rs.{(item.qty * item.price).toFixed(2)}</div>
                </div>
              ))
            ) : (
              <p>No items in the cart.</p>
            )}
          </div>
          <div className="order-total">
            <h3>Total Amount: Rs. {totalAmount.toFixed(2)}</h3>
          </div>
        </div>
        <button onClick={sendBill}>Send Bill</button>
      </div>
      <Footer />
    </>
  );
};

export default Order;