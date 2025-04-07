import React from "react";

const StatCard = ({ title, value, percentage }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 w-full">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <h2 className="text-3xl font-bold text-blue-700">{value}</h2>
      {percentage && (
        <p className="text-sm text-green-500 mt-2">+{percentage}% em relação ao mês passado</p>
      )}
    </div>
  );
};

export default StatCard;
