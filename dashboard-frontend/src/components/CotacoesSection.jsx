// src/components/StatCard.jsx
import React from "react";

const StatCard = ({ title, value, percent }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <p className="text-xs text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      <p className="text-xs text-pink-500 mt-1">+{percent}</p>
    </div>
  );
};

export default StatCard;
