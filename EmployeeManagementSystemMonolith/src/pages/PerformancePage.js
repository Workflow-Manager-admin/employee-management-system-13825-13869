import React, { useEffect, useState } from 'react';
import { apiRequest, getCurrentUserRole } from '../api';

// PUBLIC_INTERFACE
function PerformancePage() {
  /**
   * Performance evaluation and review (employee self/review, HR, manager view)
   */
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');
  const role = getCurrentUserRole();

  useEffect(() => {
    async function fetchData() {
      try {
        let res;
        if (role === 'hr') {
          res = await apiRequest('/performance/all/');
        } else if (role === 'manager') {
          res = await apiRequest('/performance/team/');
        } else {
          res = await apiRequest('/performance/me/');
        }
        setData(res || []);
      } catch {
        setStatus('Failed to load performance records');
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Performance</h2>
      {status && <div>{status}</div>}
      <table border="1" cellPadding={8} style={{width:'100%',maxWidth:700,marginTop:16}}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Review Cycle</th>
            <th>Score</th>
            <th>Rating</th>
            <th>Reviewer</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
        {data.length === 0 ? (
          <tr><td colSpan={6}>No performance records</td></tr>
        ) : data.map((row, idx) =>
          <tr key={idx}>
            <td>{row.employee_name}</td>
            <td>{row.cycle}</td>
            <td>{row.score}</td>
            <td>{row.rating}</td>
            <td>{row.reviewer}</td>
            <td>{row.feedback}</td>
          </tr>
        ) }
        </tbody>
      </table>
    </div>
  );
}

export default PerformancePage;
