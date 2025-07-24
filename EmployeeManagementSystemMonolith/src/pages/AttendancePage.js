import React, { useEffect, useState } from 'react';
import { apiRequest, getCurrentUserRole } from '../api';

// PUBLIC_INTERFACE
function AttendancePage() {
  /**
   * Attendance management and tracking page.
   */
  const [attendance, setAttendance] = useState([]);
  const [status, setStatus] = useState('');
  const role = getCurrentUserRole();

  useEffect(() => {
    async function fetchAttendance() {
      try {
        let res;
        if (role === 'hr') {
          res = await apiRequest('/attendance/all/');
        } else if(role === 'manager') {
          res = await apiRequest('/attendance/team/');
        } else {
          res = await apiRequest('/attendance/me/');
        }
        setAttendance(res || []);
      } catch {
        setStatus('Failed to fetch attendance records');
      }
    }
    fetchAttendance();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Attendance</h2>
      {status && <div style={{color:'red'}}>{status}</div>}
      <table border="1" cellPadding={8} style={{width:'100%',maxWidth:700,marginTop:16}}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>In Time</th>
            <th>Out Time</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
        {attendance.length === 0 ? (
          <tr><td colSpan={5} style={{textAlign:'center'}}>No records found</td></tr>
        ) : attendance.map((row, idx)=>
          <tr key={idx}>
            <td>{row.date}</td>
            <td>{row.status}</td>
            <td>{row.in_time}</td>
            <td>{row.out_time}</td>
            <td>{row.notes}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

export default AttendancePage;
