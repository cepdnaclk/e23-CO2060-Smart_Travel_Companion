import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { MapPin, Star, ArrowLeft } from 'lucide-react';

const Accommodation = () => {
  const { locationId } = useParams();

  const [accommodations, setAccommodations] = useState([]);
  const [location, setLocation] = useState(null);

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