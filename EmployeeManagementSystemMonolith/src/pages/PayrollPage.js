import React, { useEffect, useState } from 'react';
import { apiRequest, getCurrentUserRole } from '../api';

// PUBLIC_INTERFACE
function PayrollPage() {
  /**
   * Payroll page for viewing payslips (employee), or processing payroll (HR).
   */
  const [payroll, setPayroll] = useState([]);
  const [status, setStatus] = useState('');
  const role = getCurrentUserRole();

  useEffect(() => {
    async function fetchPayroll() {
      try {
        let res;
        if (role === 'hr') {
          res = await apiRequest('/payroll/all/');
        } else if (role === 'employee') {
          res = await apiRequest('/payroll/me/');
        } else if (role === 'manager') {
          res = await apiRequest('/payroll/team/');
        }
        setPayroll(res || []);
      } catch {
        setStatus('Failed to fetch payroll');
      }
    }
    fetchPayroll();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Payroll</h2>
      {status && <div style={{color:'red'}}>{status}</div>}
      <table border="1" cellPadding={8} style={{width:'100%',maxWidth:700,marginTop:16}}>
        <thead>
          <tr>
            <th>Month</th>
            <th>Employee</th>
            <th>Gross Salary</th>
            <th>Deductions</th>
            <th>Net Pay</th>
            <th>Status</th>
            <th>Payslip</th>
          </tr>
        </thead>
        <tbody>
        {payroll.length === 0 ? (
          <tr><td colSpan={7}>No payroll records found</td></tr>
        ) : payroll.map((row, idx) =>
          <tr key={idx}>
            <td>{row.month}</td>
            <td>{row.employee_name}</td>
            <td>{row.gross_salary}</td>
            <td>{row.deductions}</td>
            <td>{row.net_pay}</td>
            <td>{row.status}</td>
            <td>{row.payslip_link ? (
              <a href={row.payslip_link} target="_blank" rel="noreferrer">Download</a>
            ) : "-"}
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

export default PayrollPage;
