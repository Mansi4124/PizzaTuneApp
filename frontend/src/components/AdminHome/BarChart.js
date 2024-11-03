import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ orders }) => {
  // Function to parse and validate dates
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    // Check if the date is valid
    return !isNaN(parsedDate) ? parsedDate.toISOString().split('T')[0] : null;
  };

  // Aggregate totalAmount by date (group transactions by day)
  const aggregatedData = orders.reduce((acc, curr) => {
    const date = formatDate(curr.date);
    if (date) { // Only include valid dates
      acc[date] = (acc[date] || 0) + curr.totalAmount;
    }
    return acc;
  }, {});

  // Convert aggregated data to an array of objects
  const data = Object.keys(aggregatedData).map((date) => ({
    date,
    totalAmount: aggregatedData[date],
  }));

  // Get the maximum date and calculate the last 10 days
  const maxDate = new Date(Math.max(...data.map((d) => new Date(d.date))));
  const tenDaysAgo = new Date(maxDate);
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  // Filter data for the last 10 days
  const filteredData = data.filter((d) => new Date(d.date) >= tenDaysAgo);

  // Sort the data by date
  filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Prepare the data for Chart.js
  const chartData = {
    labels: filteredData.map((d) => d.date),
    datasets: [
      {
        label: "Total Amount",
        data: filteredData.map((d) => d.totalAmount),
        backgroundColor: "steelblue",
      },
    ],
  };

  // Chart.js options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Total Amount by Date (Last 10 Days)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Amount",
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
