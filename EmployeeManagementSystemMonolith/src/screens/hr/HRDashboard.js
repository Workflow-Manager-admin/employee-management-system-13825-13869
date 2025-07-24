import React from "react";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import EmployeeProfiles from "./features/EmployeeProfiles";
import Onboarding from "./features/Onboarding";
import Offboarding from "./features/Offboarding";
import Payroll from "./features/Payroll";
import LeaveManagement from "./features/LeaveManagement";
import Attendance from "./features/Attendance";
import Performance from "./features/Performance";
import Reporting from "./features/Reporting";

/**
 * PUBLIC_INTERFACE
 * HR staff home/dashboard with navigation to HR features.
 */
function HRDashboard() {
  return (
    <div className="container">
      <h2>HR Staff Dashboard</h2>
      <nav style={{ marginBottom: 16 }}>
        <Link to="profiles" style={{ margin: "0 8px" }}>Employee Profiles</Link>
        <Link to="onboarding" style={{ margin: "0 8px" }}>Onboarding</Link>
        <Link to="offboarding" style={{ margin: "0 8px" }}>Offboarding</Link>
        <Link to="payroll" style={{ margin: "0 8px" }}>Payroll</Link>
        <Link to="leave" style={{ margin: "0 8px" }}>Leave</Link>
        <Link to="attendance" style={{ margin: "0 8px" }}>Attendance</Link>
        <Link to="performance" style={{ margin: "0 8px" }}>Performance</Link>
        <Link to="reporting" style={{ margin: "0 8px" }}>Reporting</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Please select a feature.</div>} />
        <Route path="profiles" element={<EmployeeProfiles />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="offboarding" element={<Offboarding />} />
        <Route path="payroll" element={<Payroll />} />
        <Route path="leave" element={<LeaveManagement />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="performance" element={<Performance />} />
        <Route path="reporting" element={<Reporting />} />
      </Routes>
      <Outlet />
    </div>
  );
}

export default HRDashboard;
