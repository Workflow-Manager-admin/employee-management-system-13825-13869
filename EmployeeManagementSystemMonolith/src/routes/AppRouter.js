import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../screens/LoginPage";
import HRDashboard from "../screens/hr/HRDashboard";
import ManagerDashboard from "../screens/manager/ManagerDashboard";
import EmployeeDashboard from "../screens/employee/EmployeeDashboard";
import NotFound from "../screens/NotFound";
import PrivateRoute from "./PrivateRoute";

// PUBLIC_INTERFACE
function AppRouter() {
  /**
   * PUBLIC_INTERFACE
   * Renders the routing structure for the application.
   * Handles public, protected, and role-based routes.
   */
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* HR Staff Dashboard and features */}
        <Route
          path="/hr/*"
          element={
            <PrivateRoute allowedRoles={["HR"]}>
              <HRDashboard />
            </PrivateRoute>
          }
        />

        {/* Manager Dashboard and features */}
        <Route
          path="/manager/*"
          element={
            <PrivateRoute allowedRoles={["Manager"]}>
              <ManagerDashboard />
            </PrivateRoute>
          }
        />

        {/* Employee Dashboard and features */}
        <Route
          path="/employee/*"
          element={
            <PrivateRoute allowedRoles={["Employee"]}>
              <EmployeeDashboard />
            </PrivateRoute>
          }
        />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
