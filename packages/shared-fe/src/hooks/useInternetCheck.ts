/**
 * Periodic Check with Fetch:
 * You can periodically ping a reliable external server (e.g., Google)
 * or your own backend.
 * Example: Polling API Every 10 Seconds
 */
import { useState, useEffect } from 'react';

export default function useInternetCheck(url = 'https://www.google.com') {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        setIsOnline(response.ok);
      } catch {
        setIsOnline(false);
      }
    };
    checkConnection();
    const interval = setInterval(checkConnection, 10 * 1000);
    return () => clearInterval(interval);
  }, [url]);

  return isOnline;
}
