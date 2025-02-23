import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Savings = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Savings",
        data: [500, 600, 800, 700, 750, 900, 1100, 1200, 1000, 950, 1050, 1200],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const options = {
    animation: {
      duration: 0, // Disable animations
    },
    responsiveAnimationDuration: 0, // Disable resizing animation
    maintainAspectRatio: false, // Prevent forced aspect ratio resizing
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: false, // Disable tooltips to prevent hover effects
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Yearly Savings</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Savings;
