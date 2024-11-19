import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Nav, Tab, Container, Row, Col } from 'react-bootstrap';
import './AdminContact.css';
import AdminNav from '../Admin/AdminNav/AdminNav';
export default function AdminContact() {
  const [customerInquiries, setCustomerInquiries] = useState([]);
  const [franchiseInquiries, setFranchiseInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [reply, setReply] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCustomerInquiries = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/contact/get_inquiries/`);
        if (response.data.success === false) {
          setMessage(response.data.message);
        } else {
          // Only show inquiries that have not been responded to
          setCustomerInquiries(response.data.inquiries.filter(inquiry => !inquiry.responded) || []);
        }
      } catch (error) {
        console.error('Error fetching customer inquiries:', error);
        setMessage('Error fetching customer inquiries.');
      }
    };
  
    const fetchFranchiseInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:8000/contact/get_frenchise_inquiries/');
        if (response.data.success === false) {
          setMessage(response.data.message);
        } else {
          // Only show inquiries that have not been responded to
          setFranchiseInquiries(response.data.inquiries.filter(inquiry => !inquiry.responded) || []);
        }
      } catch (error) {
        console.error('Error fetching franchise inquiries:', error);
        setMessage('Error fetching franchise inquiries.');
      }
    };
  
    fetchCustomerInquiries();
    fetchFranchiseInquiries();
  }, []);
  

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = async (inquiryId, isFranchise) => {
    try {
      const url = isFranchise
        ? 'http://localhost:8000/contact/reply_frenchise_inquiry/'
        : 'http://localhost:8000/contact/reply_inquiry/';
  
      const response = await axios.post(url, {
        inquiryId,
        reply,
      });
  
      if (response.data.success) {
        setMessage('Reply sent successfully.');
        setReply('');
        setSelectedInquiry(null); // Clear selected inquiry after sending reply
  
        // Update state to remove the responded inquiry
        if (isFranchise) {
          setFranchiseInquiries(prev => prev.filter(inquiry => inquiry._id !== inquiryId));
        } else {
          setCustomerInquiries(prev => prev.filter(inquiry => inquiry._id !== inquiryId));
        }
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      setMessage('Error sending reply.');
    }
  };
  

  const handleSelectInquiry = (inquiryId) => {
    setSelectedInquiry(inquiryId === selectedInquiry ? null : inquiryId);
  };

  const renderInquiries = (inquiries, isFranchise) => (
    <div className="inquiries-grid">
      {inquiries.length > 0 ? (
        inquiries.map((inquiry) => (
          <div key={inquiry._id} className="inquiry-card">
            <h3>{inquiry.name}</h3>
            <p><strong>Email:</strong> {inquiry.email}</p>
            <p><strong>{isFranchise ? 'Message' : 'Query'}:</strong> {inquiry.query || inquiry.message}</p>
            <button onClick={() => handleSelectInquiry(inquiry._id)}>Reply</button>

            {selectedInquiry === inquiry._id && (
              <div className="reply-section">
                <textarea
                  rows="4"
                  value={reply}
                  onChange={handleReplyChange}
                  placeholder="Enter your reply here"
                ></textarea>
                <button onClick={() => handleReplySubmit(inquiry._id, isFranchise)}>Send Reply</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No {isFranchise ? 'franchise' : 'customer'} inquiries available.</p>
      )}
    </div>
  );

  return (
    <>
  <AdminNav/>
<Container fluid className='fc'>
      <Tab.Container id="left-tabs-example" defaultActiveKey="customer"  >
        <Row>
          <Col sm={12}>
            <Nav variant="tabs" className="mb-2">
              <Nav.Item>
                <Nav.Link eventKey="customer" className='links'>Customer Inquiries</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="franchise" className='links'>Franchise Inquiries</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
    
        <Row>
          <Col sm={12}>
            {message && <p className="message">{message}</p>}
            <Tab.Content>
              <Tab.Pane eventKey="customer">
                {renderInquiries(customerInquiries, false)}
              </Tab.Pane>
              <Tab.Pane eventKey="franchise">
                {renderInquiries(franchiseInquiries, true)}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
    </>
    
  );
}
