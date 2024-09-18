import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminContact.css';

export default function AdminContact() {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [reply, setReply] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch inquiries from the backend
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:8000/contact/get_inquiries/');
        if (response.data.success === false) {
          setMessage(response.data.message);
        } else {
          setInquiries(response.data.inquiries || []);
        }
      } catch (error) {
        console.error('Error fetching inquiries:', error);
        setMessage('Error fetching inquiries.');
      }
    };

    fetchInquiries();
  }, []);

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = async (inquiryId) => {
    try {
      await axios.post('http://localhost:8000/contact/reply_inquiry/', {
        inquiryId,
        reply,
      });
      setMessage('Reply sent successfully.');
      setReply('');
      setSelectedInquiry(null);  // Clear selected inquiry after sending reply
    } catch (error) {
      console.error('Error sending reply:', error);
      setMessage('Error sending reply.');
    }
  };

  const handleSelectInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
  };

  return (
    <div className="admin-contact">
      <h1>Customer Inquiries</h1>
      {message && <p className="message">{message}</p>}
      <div className="inquiries-list">
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <div key={inquiry._id} className="inquiry-item">
              <h3>{inquiry.name}</h3>
              <p><strong>Email:</strong> {inquiry.email}</p>
              <p><strong>Query:</strong> {inquiry.query}</p>
              <button onClick={() => handleSelectInquiry(inquiry)}>Reply</button>
            </div>
          ))
        ) : (
          <p>No inquiries available.</p>
        )}
      </div>
      {selectedInquiry && (
        <div className="reply-section">
          <h2>Reply to {selectedInquiry.name}</h2>
          <textarea
            rows="4"
            value={reply}
            onChange={handleReplyChange}
            placeholder="Enter your reply here"
          ></textarea>
          <button onClick={() => handleReplySubmit(selectedInquiry._id)}>Send Reply</button>
        </div>
      )}
    </div>
  );
}
