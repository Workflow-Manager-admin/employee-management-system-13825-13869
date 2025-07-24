import React from "react";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import EmployeeProfiles from "./features/EmployeeProfiles";
import LeaveManagement from "./features/LeaveManagement.js";
import Attendance from "./features/Attendance";
import Payroll from "./features/Payroll";

/**
 * PUBLIC_INTERFACE
 * Employee self-service dashboard for viewing/updating profile, leave, payslips, and attendance.
 */
function EmployeeDashboard() {
  return (
    <div className="container">
      <h2>Employee Dashboard</h2>
      <nav style={{ marginBottom: 16 }}>
        <Link to="profile" style={{ margin: "0 8px" }}>Profile</Link>
        <Link to="leave" style={{ margin: "0 8px" }}>Leave</Link>
        <Link to="attendance" style={{ margin: "0 8px" }}>Attendance</Link>
        <Link to="payroll" style={{ margin: "0 8px" }}>Payslips</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Welcome! Choose an option.</div>} />
        <Route path="profile" element={<EmployeeProfiles />} />
        <Route path="leave" element={<LeaveManagement />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="payroll" element={<Payroll />} />
      </Routes>
      <Outlet />
    </div>
  );
}

export default EmployeeDashboard;
