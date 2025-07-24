import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

// PUBLIC_INTERFACE
function LoginPage() {
  /**
   * Renders the secure login form.
   */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{
      maxWidth: 370, margin: '7% auto', boxShadow: '0 2px 12px #e5e6ef',
      background: 'var(--bg-primary)', borderRadius: 10, padding: '2.5rem 2rem'
    }}>
      <h2 style={{marginBottom:10}}>Employee Management Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom:12}}>
          <label>Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} required
            style={{width:'100%',padding:8,marginTop:2}} />
        </div>
        <div style={{marginBottom:18}}>
          <label>Password</label>
          <input type="password" value={password} required onChange={e=>setPassword(e.target.value)}
            style={{width:'100%',padding:8,marginTop:2}} />
        </div>
        {error && <div style={{color:'red',marginBottom:10}}>{error}</div>}
        <button type="submit" className="btn" disabled={loading} style={{width:'100%',padding:10}}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
