// src/components/Dashboard.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import StatCard from "./StatCard";
import ChartSection from "./ChartSection";

const Dashboard = () => {
  return (
    <div className="flex bg-[#f7f9fb] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />
        <div className="grid grid-cols-3 gap-6 mt-6">
          <StatCard title="Avg Daily Views" value="234" percent="3%" />
          <StatCard title="User Increase" value="22%" percent="22%" />
          <StatCard title="New Users" value="2,345" percent="12%" />
        </div>
        <ChartSection />
      </main>
    </div>
  );
};

export default Dashboard;
