import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import AttendancePage from './pages/AttendancePage';
import LeavePage from './pages/LeavePage';
import PayrollPage from './pages/PayrollPage';
import PerformancePage from './pages/PerformancePage';
import ReportsPage from './pages/ReportsPage';
import OnboardingPage from './pages/OnboardingPage';
import NotFoundPage from './pages/NotFoundPage';
import { getCurrentUserRole } from './api';
import Layout from './components/Layout';

/**
 * PrivateRoute: Protects routes by authentication and optionally role.
 * @param {ReactNode} children - child components (assigned route)
 * @param {string[]} roles - (Optional) Roles allowed to view page
 */
function PrivateRoute({ children, roles }) {
  const role = getCurrentUserRole();
  if (!role) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(role)) return <Navigate to="/" replace />;
  return children;
}

// PUBLIC_INTERFACE
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="leave" element={<LeavePage />} />
          <Route path="payroll" element={<PayrollPage />} />
          <Route path="performance" element={<PerformancePage />} />
          <Route path="reports" element={
            <PrivateRoute roles={['hr', 'manager']}>
              <ReportsPage />
            </PrivateRoute>
          } />
          <Route path="onboarding" element={
            <PrivateRoute roles={['hr']}>
              <OnboardingPage />
            </PrivateRoute>
          } />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
