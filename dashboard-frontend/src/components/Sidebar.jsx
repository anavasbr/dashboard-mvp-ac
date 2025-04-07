import React from "react";
import { FaUser, FaChartLine, FaCogs } from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { icon: <FaUser />, label: "Clientes" },
    { icon: <FaChartLine />, label: "Cotações" },
    { icon: <FaCogs />, label: "Configurações" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-100 border-r border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-10">Dashboard</h2>
      <ul className="space-y-6">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer"
          >
            <span className="text-xl mr-3">{item.icon}</span>
            <span className="text-lg">{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
