import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import './LocationCard.css';

const LocationCard = ({ location }) => {
  return (
    <div className="location-card glass animate-fade-in">
      <div className="card-image">
        <img src={location.imageUrl || 'https://via.placeholder.com/400x250?text=Sri+Lanka'} alt={location.name} />
      </div>
      <div className="card-content">
        <h3>{location.name}</h3>
        <p className="district"><MapPin size={16} /> {location.district}</p>
        <p className="description">{location.description?.substring(0, 80)}...</p>
        <div className="card-actions">
          <Link to={`/accommodation/${location.id}`} className="btn btn-primary btn-sm">Stays</Link>
          <Link to={`/map?lat=${location.latitude}&lng=${location.longitude}&dest=${encodeURIComponent(location.name)}`} className="btn btn-outline btn-sm">Route</Link>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
