'use client';

import { useState, useEffect } from 'react';

/**
 * Location object will be sth like -
 * {
 *   coords: {
 *     accuracy: 16.872,
 *     altitude: null,
 *     altitudeAccuracy: null,
 *     heading: null,
 *     latitude: 28.4959922,
 *     longitude: 77.1059712
 *     speed: null
 *   },
 *   timestamp: 1739547907601
 * }
 */

export default function useLocation() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      err => {
        setError(err.message);
      }
    );
  }, []);

  return { location, error };
}
