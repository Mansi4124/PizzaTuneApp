import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const DoughnutChart = ({ orders }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Store the chart instance

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const itemQuantities = {};
    orders.forEach(order => {
      order.cartItems.forEach(item => {
        itemQuantities[item.name] = (itemQuantities[item.name] || 0) + item.qty;
      });
    });

    const data = {
      labels: Object.keys(itemQuantities),
      datasets: [{
        label: 'Item Quantities',
        data: Object.values(itemQuantities),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      }],
    };

    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Item Distribution',
          },
        },
      },
    });

    return () => {
      // Cleanup on unmount
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [orders]);

  return <canvas ref={chartRef} width="400" height="200"></canvas>;
};

export default DoughnutChart;
