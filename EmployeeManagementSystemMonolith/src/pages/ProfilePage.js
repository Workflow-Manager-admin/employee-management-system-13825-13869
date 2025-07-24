import React, { useEffect, useState } from 'react';
import { apiRequest, getCurrentUserRole, getCurrentUser } from '../api';

// PUBLIC_INTERFACE
function ProfilePage() {
  /**
   * Profile page for viewing/updating personal or employee information.
   */
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const role = getCurrentUserRole();

  useEffect(() => {
    async function fetchProfile() {
      try {
        let res;
        if (role === 'hr') {
          res = await apiRequest('/employees/me/');
        } else {
          res = await apiRequest('/employees/me/');
        }
        setProfile(res);
        setForm(res);
      } catch {
        setStatus('Failed to fetch profile');
      }
    }
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus('');
    try {
      await apiRequest('/employees/me/', { method: 'PATCH', body: JSON.stringify(form) });
      setProfile(form);
      setEditing(false);
      setStatus('Profile updated!');
    } catch {
      setStatus('Update failed');
    }
    setSaving(false);
  };

  if (!profile) return <div>Loading profile...</div>;
  return (
    <div>
      <h2>Profile</h2>
      <form style={{maxWidth:400}} onSubmit={onSave}>
        <label>Name
          <input name="full_name" value={form.full_name || ''} onChange={onChange} disabled={!editing} />
        </label>
        <br/>
        <label>Email
          <input name="email" value={form.email || ''} onChange={onChange} disabled={!editing} type="email"/>
        </label>
        <br/>
        <label>Phone
          <input name="phone" value={form.phone || ''} onChange={onChange} disabled={!editing}/>
        </label>
        <br/>
        <label>Department
          <input name="department" value={form.department || ''} onChange={onChange} disabled={!editing}/>
        </label>
        <br/>
        <label>Position
          <input name="position" value={form.position || ''} onChange={onChange} disabled={!editing}/>
        </label>
        <br/>
        {editing ? (
          <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        ) : (
          <button className="btn" type="button" onClick={() => setEditing(true)}>Edit</button>
        )}
      </form>
      <div style={{color:'darkgreen',marginTop:8}}>{status}</div>
    </div>
  );
}

export default ProfilePage;
