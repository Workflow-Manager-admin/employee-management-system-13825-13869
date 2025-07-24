import React, { useState } from 'react';
import { apiRequest } from '../api';

// PUBLIC_INTERFACE
function OnboardingPage() {
  /**
   * Employee onboarding form for HR.
   */
  const [form, setForm] = useState({ username:'', email:'', full_name:'', department:'', position:'' });
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setSubmitting(true);
    try {
      await apiRequest('/employees/', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setStatus('Employee onboarded!');
      setForm({ username:'', email:'', full_name:'', department:'', position:'' });
    } catch {
      setStatus('Failed to create employee');
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h2>Onboard New Employee</h2>
      <form style={{maxWidth:360}} onSubmit={handleSubmit}>
        <label>Username
          <input required name="username" value={form.username} onChange={onChange} />
        </label><br/>
        <label>Email
          <input required name="email" type="email" value={form.email} onChange={onChange} />
        </label><br/>
        <label>Name
          <input required name="full_name" value={form.full_name} onChange={onChange} />
        </label><br/>
        <label>Department
          <input required name="department" value={form.department} onChange={onChange} />
        </label><br/>
        <label>Position
          <input required name="position" value={form.position} onChange={onChange} />
        </label><br/>
        <button className="btn" disabled={submitting}>{submitting ? 'Saving...' : 'Onboard'}</button>
      </form>
      <div style={{color: status.startsWith('Failed') ? 'red' : 'darkgreen',marginTop:7}}>{status}</div>
    </div>
  );
}

export default OnboardingPage;
