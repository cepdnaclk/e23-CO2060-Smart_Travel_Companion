import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const MapPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const destLat = searchParams.get('lat') || '7.8731';
  const destLng = searchParams.get('lng') || '80.7718';
  const destName = searchParams.get('dest') || 'Sri Lanka';

  const mapUrl = `https://maps.google.com/maps?q=${destLat},${destLng}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  // NEW: loading state
  const [loading, setLoading] = useState(true);

  return (
    <div className="container animate-fade-in mb-4">
      
      {/* Header */}
      <div className="text-center mb-2">
        <h2>
          <MapPin className="icon-inline" /> Route to {destName}
        </h2>
        <p className="text-muted">Explore the interactive map below.</p>
      </div>

      <div
        className="glass"
        style={{
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          height: '70vh',
          position: 'relative'
        }}
      >
        
        {/* Spinner overlay */}
        {loading && (
          <div className="spinner">
            Loading map...
          </div>
        )}

        {/* Map */}
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${destName}`}
          onLoad={() => setLoading(false)} // when map loads
        ></iframe>
      </div>
    </div>
  );
};

export default MapPage;