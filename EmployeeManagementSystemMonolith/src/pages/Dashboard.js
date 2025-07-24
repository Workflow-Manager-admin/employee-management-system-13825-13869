import React from 'react';
import { getCurrentUserRole, getCurrentUser } from '../api';

// PUBLIC_INTERFACE
function Dashboard() {
  /**
   * Dashboard page displays a summary based on the role.
   */
  const role = getCurrentUserRole();
  const user = getCurrentUser();

  let content = null;
  if (role === 'hr') {
    content = (
      <>
        <h2>HR Dashboard</h2>
        <ul>
          <li>View company-wide attendance and leave summary</li>
          <li>Recent onboardings and offboardings</li>
          <li>Payroll status & compliance alerts</li>
          <li>Access management reports & analytics</li>
        </ul>
      </>
    );
  } else if (role === 'manager') {
    content = (
      <>
        <h2>Manager Dashboard</h2>
        <ul>
          <li>Team attendance/leave at a glance</li>
          <li>Pending approvals for leave</li>
          <li>Team performance summary</li>
        </ul>
      </>
    );
  } else {
    content = (
      <>
        <h2>Welcome, {user?.full_name || user?.username}</h2>
        <ul>
          <li>View payslips and payroll info</li>
          <li>Submit/track leave requests</li>
          <li>Monitor attendance</li>
          <li>Update your profile</li>
        </ul>
      </>
    );
  }
  return (
    <div>
      {content}
    </div>
  );
}

export default Dashboard;
