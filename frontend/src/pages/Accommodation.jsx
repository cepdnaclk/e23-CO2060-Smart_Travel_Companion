import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { MapPin, Star, ArrowLeft } from 'lucide-react';

const Accommodation = () => {
  const { locationId } = useParams();
  const [accommodations, setAccommodations] = useState([]);
  const [location, setLocation] = useState(null);

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

  if (!location) return <div className="container text-center mt-4">Loading...</div>;

  return (
    <div className="container animate-fade-in mb-4">
      <Link to="/explore" className="btn btn-outline btn-sm mb-2"><ArrowLeft size={16} /> Back to Explore</Link>
      
      <div className="glass p-4 mb-4" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
        <h2>Stays in {location.name}</h2>
        <p className="district"><MapPin size={16} /> {location.district}</p>
      </div>

      <div className="grid">
        {accommodations.length > 0 ? accommodations.map(acc => (
          <div key={acc.id} className="location-card glass">
            <div className="card-image">
              <img src={acc.imageUrl || 'https://via.placeholder.com/400x250?text=Hotel'} alt={acc.name} />
            </div>
            <div className="card-content">
              <h3>{acc.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <p style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '1.2rem' }}>${acc.price} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ night</span></p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 'bold' }}>
                  <Star size={16} color="#FFD700" fill="#FFD700" /> {acc.rating}
                </p>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center" style={{ gridColumn: '1 / -1' }}>
            <p>No accommodations listed for this location yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accommodation;
