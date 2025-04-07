// src/components/ChartSection.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ChartSection = () => {
  const data = {
    labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
    datasets: [
      {
        label: "+20%",
        data: [1, 2, 1.5, 2.2, 1.8, 2.3, 2.2, 3.0, 4],
        borderColor: "#f472b6",
        backgroundColor: "#f472b6",
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: {
      y: { display: false },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full mt-4">
      <h3 className="text-sm font-medium mb-2 text-gray-600">User Trends</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartSection;
