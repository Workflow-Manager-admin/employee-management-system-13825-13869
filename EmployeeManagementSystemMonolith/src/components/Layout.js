import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { logout, getCurrentUserRole, getCurrentUser } from '../api';
import './Layout.css';

const roleMenus = {
  hr: [
    { to: '/', label: 'Dashboard' },
    { to: '/onboarding', label: 'Onboarding' },
    { to: '/profile', label: 'Employee Profiles' },
    { to: '/attendance', label: 'Attendance' },
    { to: '/leave', label: 'Leave' },
    { to: '/payroll', label: 'Payroll' },
    { to: '/performance', label: 'Performance' },
    { to: '/reports', label: 'Reports' },
  ],
  manager: [
    { to: '/', label: 'Dashboard' },
    { to: '/profile', label: 'My Team' },
    { to: '/attendance', label: 'Team Attendance' },
    { to: '/leave', label: 'Leave Approvals' },
    { to: '/performance', label: 'Performance' },
    { to: '/reports', label: 'Reports' },
  ],
  employee: [
    { to: '/', label: 'Dashboard' },
    { to: '/profile', label: 'My Profile' },
    { to: '/attendance', label: 'Attendance' },
    { to: '/leave', label: 'Leave' },
    { to: '/payroll', label: 'Payroll' },
    { to: '/performance', label: 'Performance' },
  ],
};

function Layout() {
  const role = getCurrentUserRole();
  const user = getCurrentUser();
  const navigate = useNavigate();
  const menus = roleMenus[role] || [];

  // PUBLIC_INTERFACE
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="main-layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <span className="app-name">EMS</span>
        </div>
        <div className="user-info">
          <span>{user?.full_name || user?.username}</span>
          <span className="user-role">{role}</span>
        </div>
        <ul className="nav-list">
          {menus.map(item => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => isActive ? 'active' : ''} end>{item.label}</NavLink>
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
