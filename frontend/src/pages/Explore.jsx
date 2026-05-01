import React, { useEffect, useState } from 'react';
import api from '../services/api';
import LocationCard from '../components/LocationCard';
import { Search } from 'lucide-react';

const Explore = () => {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await api.get('/locations');
        setLocations(response.data);
      } catch (error) {
        console.error('Failed to fetch locations', error);
      }
    };
    fetchLocations();
  }, []);

  // Debounce (better UX)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Filter logic (safe)
  const filteredLocations = locations.filter(loc => {
    const name = loc.name?.toLowerCase() || '';
    const district = loc.district?.toLowerCase() || '';

    return (
      name.includes(debouncedSearch) ||
      district.includes(debouncedSearch)
    );
  });

  return (
    <div className="container animate-fade-in mb-4">
      
      {/* Header */}
      <div className="text-center mb-2">
        <h2>Explore Sri Lanka</h2>
        <p className="text-muted">Find your next adventure.</p>
      </div>

      {/* Search Bar */}
      <div
        className="form-group"
        style={{
          maxWidth: '600px',
          margin: '0 auto 2rem auto',
          position: 'relative'
        }}
      >
        <Search
          style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            color: 'var(--text-muted)'
          }}
          size={20}
        />

        <input
          type="text"
          className="form-control glass"
          placeholder="Search by name or district..."
          style={{ paddingLeft: '45px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Locations Grid */}
      <div className="grid">
        {filteredLocations.map(location => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>

      {/* Empty State */}
      {filteredLocations.length === 0 && (
        <div
          className="text-center mt-2 glass"
          style={{ padding: '2rem' }}
        >
          <p>No locations found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Explore;