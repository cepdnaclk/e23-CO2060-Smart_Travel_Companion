import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, Link, useLocation } from 'react-router-dom';
import api from '../services/api';
import { MapPin, Star, ArrowLeft } from 'lucide-react';

const Accommodation = () => {
  const { locationId } = useParams();

  const [accommodations, setAccommodations] = useState([]);
  const [location, setLocation] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const { user } = useContext(AuthContext);
  const routerLocation = useLocation();
  const [notification, setNotification] = useState('');

  // NEW STATES
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accRes, locRes] = await Promise.all([
          api.get(`/accommodations/location/${locationId}`),
          api.get(`/locations/${locationId}`)
        ]);
        setAccommodations(accRes.data);
        setLocation(locRes.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, [locationId]);

  // Load current user's bookings to show status badges
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      try {
        const res = await api.get('/bookings/my', { silent: true });
        setUserBookings(res.data || []);
      } catch (err) {
        // ignore (user may be unauthenticated)
      }
    };
    fetchBookings();
  }, [user]);

  useEffect(() => {
    if (routerLocation.state?.bookingSuccess) {
      setNotification('Booking requested successfully. Your reservation is pending admin approval.');
      window.history.replaceState({}, document.title);
    }
  }, [routerLocation.state]);

  // FILTER
  const filtered = accommodations.filter(a => a.price <= maxPrice);

  // SORT
  const sorted = [...filtered].sort((a, b) =>
    sortBy === 'price'
      ? a.price - b.price
      : b.rating - a.rating
  );

  if (!location) return <div className="container text-center mt-4">Loading...</div>;

  return (
    <div className="container animate-fade-in mb-4">
      
      <Link to="/explore" className="btn btn-outline btn-sm mb-2">
        <ArrowLeft size={16} /> Back to Explore
      </Link>

      <div className="glass p-4 mb-4" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
        <h2>Stays in {location.name}</h2>
        <p className="district">
          <MapPin size={16} /> {location.district}
        </p>
      </div>

      {notification && (
        <div className="glass p-4 mb-4" style={{ borderLeft: '4px solid var(--success)' }}>
          <strong>Booking Pending</strong>
          <p>{notification}</p>
        </div>
      )}

      {/* FILTER + SORT UI */}
      <div className="glass p-3 mb-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        
        <div>
          <label>Max Price: ${maxPrice}</label><br />
          <input
            type="range"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Sort By:</label><br />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="price">Price (Low → High)</option>
            <option value="rating">Rating (High → Low)</option>
          </select>
        </div>

      </div>

      <div className="grid">
        {sorted.length > 0 ? (
          sorted.map(acc => (
            <div key={acc.id} className="location-card glass">
              <div className="card-image">
                <img
                  src={acc.imageUrl || 'https://via.placeholder.com/400x250?text=Hotel'}
                  alt={acc.name}
                />
              </div>

              <div className="card-content">
                <h3>{acc.name}</h3>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1rem'
                }}>
                  <p style={{
                    fontWeight: '600',
                    color: 'var(--primary)',
                    fontSize: '1.2rem'
                  }}>
                    ${acc.price}
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {' '} / night
                    </span>
                  </p>

                  <p style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    fontWeight: 'bold'
                  }}>
                    <Star size={16} color="#FFD700" fill="#FFD700" />
                    {acc.rating}
                  </p>
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                  {(() => {
                    const myBooking = userBookings.find(b => b.accommodation?.id === acc.id);
                    if (myBooking) {
                      const status = myBooking.status || 'PENDING';
                      const label = status === 'CONFIRMED' || status === 'ACTIVE' ? 'BOOKED' : status;
                      const cls = status === 'PENDING' ? 'btn btn-outline' : 'btn btn-primary';
                      return (
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span className={cls} style={{ padding: '0.35rem 0.6rem' }}>{label}</span>
                          <Link to={`/booking/${acc.id}`} className="btn btn-outline btn-sm">View</Link>
                        </div>
                      );
                    }
                    return (
                      <Link to={`/booking/${acc.id}`} className="btn btn-primary btn-sm">
                        Book Now
                      </Link>
                    );
                  })()}
                </div>
              </div>
            </div>
          ))
        ) : (
          // IMPROVED EMPTY STATE
          <div className="text-center" style={{ gridColumn: '1 / -1' }}>
            <p>No accommodations found under ${maxPrice}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accommodation;