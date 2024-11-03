import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const LineChart = ({ orders }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Store the chart instance

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Sort the orders array by date
    const sortedOrders = [...orders].sort((a, b) => new Date(a.date) - new Date(b.date));

    const labels = sortedOrders.map(order => order.date); // Adjust as needed for your data
    const data = {
      labels,
      datasets: [
        {
          label: 'Total Amount',
          data: sortedOrders.map(order => order.totalAmount), // Adjust as needed
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1,
        },
      ],
    };

    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Total Amount',
            },
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

export default LineChart;
