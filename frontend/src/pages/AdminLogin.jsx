import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/admin/login', { email, password });
      login(response.data.accessToken);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data || 'Invalid admin credentials');
    }
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '400px', marginTop: '4rem', marginBottom: '4rem' }}>
      <div className="glass p-4" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
        <div className="text-center mb-2">
          <h2><ShieldAlert className="icon-inline text-primary" /> Admin Portal</h2>
          <p className="text-muted">Authorized personnel only</p>
        </div>
        {error && <div style={{ color: '#ff4d4f', marginBottom: '1rem', textAlign: 'center', background: 'rgba(255,77,79,0.1)', padding: '0.5rem', borderRadius: '4px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Admin Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
