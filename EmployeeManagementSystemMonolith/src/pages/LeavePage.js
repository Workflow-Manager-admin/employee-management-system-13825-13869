import React, { useState, useEffect } from 'react';
import { apiRequest, getCurrentUserRole } from '../api';

// PUBLIC_INTERFACE
function LeavePage() {
  /**
   * Leave request and approval page.
   */
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({ date: '', reason: '' });
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const role = getCurrentUserRole();

  useEffect(() => {
    async function fetchLeaves() {
      try {
        let res;
        if (role === 'hr') {
          res = await apiRequest('/leave/all/');
        } else if (role === 'manager') {
          res = await apiRequest('/leave/team/');
        } else {
          res = await apiRequest('/leave/me/');
        }
        setLeaves(res || []);
      } catch {
        setStatus('Could not fetch leave records');
      }
    }
    fetchLeaves();
    // eslint-disable-next-line
  }, []);

  const submitRequest = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');
    try {
      await apiRequest('/leave/', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setStatus('Request submitted!');
      setForm({ date: '', reason: '' });
    } catch {
      setStatus('Failed to submit request');
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h2>Leave Management</h2>
      {role === 'employee' && (
        <form style={{maxWidth:350,marginBottom:14}} onSubmit={submitRequest}>
          <label>Date <input type="date" name="date" value={form.date} 
            onChange={e=>setForm({...form,date:e.target.value})} required /></label>
          <br/>
          <label>Reason <input name="reason" value={form.reason} 
            onChange={e=>setForm({...form,reason:e.target.value})} required /></label>
          <br/>
          <button disabled={submitting} className="btn">{submitting?'Submitting...':'Request Leave'}</button>
        </form>
      )}
      {status && <div style={{color:'darkgreen'}}>{status}</div>}
      <table border="1" cellPadding={8} style={{width:'100%',maxWidth:700,marginTop:16}}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
            {role!=='employee' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
        {leaves.length === 0 ? (
          <tr><td colSpan={role!=='employee'?4:3} style={{textAlign:'center'}}>No leave records</td></tr>
        ) : leaves.map((row, idx) =>
          <tr key={idx}>
            <td>{row.date}</td>
            <td>{row.reason}</td>
            <td>{row.status}</td>
            {role !== 'employee' && (
              <td>
                {row.status === 'pending' && (
                  <button className="btn" onClick={async()=>{
                    await apiRequest(`/leave/${row.id}/approve/`, { method: 'POST' });
                    setStatus('Leave approved!');
                  }}>Approve</button>
                )}
              </td>
            )}
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

export default LeavePage;
