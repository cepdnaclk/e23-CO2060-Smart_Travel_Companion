import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookings/my');
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!confirm('Cancel this booking?')) return;
    try {
      await api.delete(`/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert('Could not cancel booking.');
    }
  };

  if (loading) return <div className="container mt-6">Loading your bookings...</div>;
  if (error) return <div className="container mt-6 text-error">{error}</div>;

  return (
    <div className="container mt-6">
      <h2>My Bookings</h2>
      {bookings.length === 0 && (
        <div className="glass p-4">You have no bookings yet. <Link to="/explore">Explore stays</Link></div>
      )}

      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        {bookings.map((b) => (
          <div key={b.id} className="glass p-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div><strong>{b.accommodation?.name ?? 'Accommodation'}</strong></div>
              <div className="text-muted">{new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}</div>
              <div className="text-muted">Status: {b.status}</div>
              <div><strong>Total:</strong> ${b.totalPrice}</div>
            </div>
            <div>
              <button className="btn btn-outline" onClick={() => navigate(`/booking/${b.accommodationId}`)}>View</button>
              <button className="btn btn-danger" style={{ marginLeft: 8 }} onClick={() => handleCancel(b.id)}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;