// src/components/Header.jsx
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-b">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      <p className="text-sm text-gray-500">John Smith</p>
    </div>
  );
};

export default Header;
