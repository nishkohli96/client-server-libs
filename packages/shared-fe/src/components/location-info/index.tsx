'use client';

import { useLocation } from '@/hooks';

export default function LocationInfo() {
  const { location, error } = useLocation();
  return (
    <div>
      <h2>📍 Your Location</h2>
      {location ? (
        <p>
          Latitude:
          {' '}
          {location.lat}
          {' '}
          <br />
          Longitude:
          {' '}
          {location.lon}
        </p>
      ) : (
        <p>Fetching location...</p>
      )}
      {error && (
        <p style={{ color: 'red' }}>
          🚫
          {error}
        </p>
      )}
    </div>
  );
}
