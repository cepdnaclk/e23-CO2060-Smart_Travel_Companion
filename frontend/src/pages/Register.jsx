import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Password strength check
  const isStrongPassword =
    password.length >= 8 && /[A-Z]/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Prevent submission if password is weak
    if (!isStrongPassword) {
      setError("Password must be at least 8 characters and contain at least one uppercase letter");
      return;
    }

    try {
      await api.post('/auth/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div
      className="container animate-fade-in mb-4"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh'
      }}
    >
      <div className="glass" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <h2 className="text-center mb-2">
          <UserPlus className="icon-inline" /> Register
        </h2>

        {/*  Error message */}
        {error && (
          <div style={{ color: '#ff4d4f', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); // clear error while typing
              }}
              required
            />

            {/* Live password validation */}
            {password && !isStrongPassword && (
              <p style={{ color: '#ff4d4f', fontSize: '0.85rem', marginTop: '5px' }}>
                Password must be at least 8 characters and contain a capital letter
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: '1rem' }}
          >
            Register
          </button>
        </form>

        <p className="text-center mt-1 text-muted" style={{ fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--secondary)' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;