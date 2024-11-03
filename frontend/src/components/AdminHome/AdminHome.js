import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminHome.css';
import BarChart from './BarChart';
import PieChart from './PieChart';
import LineChart from './LineChart'; // Import new line chart
import DoughnutChart from './DoughtNutChart'; // Import new doughnut chart
import AdminNav from '../Admin/AdminNav/AdminNav';

const AdminHome = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [topSellingItems, setTopSellingItems] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);
  
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/order/get_orders/');
      if (response.status === 200) {
        console.log('Orders fetched:', response.data.orders);
        setOrders(response.data.orders);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err) {
      setError('An error occurred while fetching orders');
    }
  };
  
  return (
    <>
      <AdminNav />
      <div className="admin-home">
        <h2>Admin - Orders Management</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {orders && orders.length > 0 && (
          <div className="dashboard">
            <h3>Dashboard</h3>
            <div className="charts-container">
              <div className="chart-item">
                <BarChart orders={orders} />
                <p className="chart-title">Bar Chart</p>
              </div>
              <div className="chart-item">
                <PieChart orders={orders} setTopSellingItems={setTopSellingItems} />
                <p className="chart-title">Pie Chart</p>
              </div>
              <div className="chart-item">
                <LineChart orders={orders} />
                <p className="chart-title">Line Chart</p>
              </div>
              <div className="chart-item">
                <DoughnutChart orders={orders} />
                <p className="chart-title">Doughnut Chart</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminHome;
