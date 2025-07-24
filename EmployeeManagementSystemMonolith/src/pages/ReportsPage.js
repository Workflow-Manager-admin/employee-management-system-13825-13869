import React, { useEffect, useState } from 'react';
import { apiRequest } from '../api';

// PUBLIC_INTERFACE
function ReportsPage() {
  /**
   * Company-wide or team reporting interface (for HR/Managers).
   */
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await apiRequest('/reports/');
        setData(res || []);
      } catch {
        setStatus('Failed to load reports');
      }
    }
    fetchReports();
  }, []);

  return (
    <div>
      <h2>Reports & Analytics</h2>
      {status && <div>{status}</div>}
      <ul>
        {data.length === 0
          ? <li>No reports yet.</li>
          : data.map((r,i) => <li key={i}><a href={r.link} target="_blank" rel="noreferrer">{r.title}</a></li>)
        }
      </ul>
    </div>
  );
}

export default ReportsPage;
