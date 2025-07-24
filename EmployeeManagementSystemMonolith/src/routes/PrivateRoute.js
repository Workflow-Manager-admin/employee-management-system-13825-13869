import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/**
 * PUBLIC_INTERFACE
 * PrivateRoute wraps components and only renders them if the user is authenticated and has an allowed role.
 * Otherwise, navigates to the login page.
 */
function PrivateRoute({ children, allowedRoles }) {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !hasRole(allowedRoles)) {
    // Redirect to login (alternatively, render an "Unauthorized" message/page)
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default PrivateRoute;
