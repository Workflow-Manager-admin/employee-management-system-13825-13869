import React from "react";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import LeaveManagement from "./features/LeaveManagement";
import Performance from "./features/Performance";
import Reporting from "./features/Reporting";

/**
 * PUBLIC_INTERFACE
 * Manager dashboard. Can approve leave, review performance, and access analytics.
 */
function ManagerDashboard() {
  return (
    <div className="container">
      <h2>Manager Dashboard</h2>
      <nav style={{ marginBottom: 16 }}>
        <Link to="leave" style={{ margin: "0 8px" }}>Leave Approval</Link>
        <Link to="performance" style={{ margin: "0 8px" }}>Performance Review</Link>
        <Link to="reporting" style={{ margin: "0 8px" }}>Analytics/Reporting</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Welcome, manager! Please select a feature.</div>} />
        <Route path="leave" element={<LeaveManagement />} />
        <Route path="performance" element={<Performance />} />
        <Route path="reporting" element={<Reporting />} />
      </Routes>
      <Outlet />
    </div>
  );
}

export default ManagerDashboard;
