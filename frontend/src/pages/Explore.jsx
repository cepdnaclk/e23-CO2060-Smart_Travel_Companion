import React, { useEffect, useState } from 'react';
import api from '../services/api';
import LocationCard from '../components/LocationCard';
import { Search } from 'lucide-react';

const Explore = () => {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [district, setDistrict] = useState('All'); // ✅ NEW

  // 🔥 Fetch locations
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

  // 🔥 Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 🔥 District list (dynamic)
  const districts = ['All', ...new Set(locations.map(l => l.district).filter(Boolean))];

  // 🔥 Filter logic (UPDATED)
  const filteredLocations = locations.filter(loc => {
    const name = loc.name?.toLowerCase() || '';
    const locDistrict = loc.district || '';
    const locDistrictLower = locDistrict.toLowerCase();

    const matchesSearch =
      name.includes(debouncedSearch) ||
      locDistrictLower.includes(debouncedSearch);

    const matchesDistrict =
      district === 'All' || locDistrict === district;

    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="container animate-fade-in mb-4">

      {/* 🔥 Header */}
      <div className="text-center mb-2">
        <h2>Explore Sri Lanka</h2>
        <p className="text-muted">Find your next adventure.</p>
      </div>

      {/* 🔥 Search Bar */}
      <div
        className="form-group"
        style={{
          maxWidth: '600px',
          margin: '0 auto 1rem auto',
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

      {/* 🔥 District Dropdown (NEW UI) */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <select
          className="form-control glass"
          style={{ maxWidth: '300px', margin: '0 auto' }}
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        >
          {districts.map((d, index) => (
            <option key={index} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* 🔥 Locations Grid */}
      <div className="grid">
        {filteredLocations.map(location => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>

      {/* 🔥 Empty State */}
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