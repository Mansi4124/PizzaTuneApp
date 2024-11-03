import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './PieChart.css';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ orders, setTopSellingItems }) => {
  useEffect(() => {
    const data = prepareData(orders);
    setTopSellingItems(data.slice(0, 4)); // Now limited to 4 items
  }, [orders]);

  const prepareData = (orders) => {
    const itemQuantities = {};

    orders.forEach(order => {
      order.cartItems.forEach(item => {
        itemQuantities[item.name] = (itemQuantities[item.name] || 0) + item.qty;
      });
    });

    const sortedItems = Object.entries(itemQuantities).sort((a, b) => b[1] - a[1]);
    const topItems = sortedItems.slice(0, 4); // Get top 4 items
    const othersQuantity = sortedItems.slice(4).reduce((sum, [, qty]) => sum + qty, 0);

    const chartData = topItems.map(([name, qty]) => ({ name, qty }));
    if (othersQuantity > 0) {
      chartData.push({ name: 'Others', qty: othersQuantity });
    }

    return chartData;
  };

  const data = prepareData(orders);

  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        data: data.map(d => d.qty),
        backgroundColor: data.map((_, index) => `hsl(${index * 60}, 40%, 50%)`), // Different colors for each segment
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const { label, formattedValue } = tooltipItem;
            return `${label}: ${formattedValue}`;
          },
        },
      },
    },
  };

  return (
    <div className="pie-chart-container">
      <Doughnut data={chartData} options={options} aria-label="Pie chart showing distribution of orders" />
    </div>
  );
};

export default PieChart;
