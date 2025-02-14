'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof window !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    function updateOnlineStatus() {
      const isConnectedToInternet = navigator.onLine;
      if (isConnectedToInternet) {
        toast.success('Connected to Internet');
      } else {
        toast.error('No Internet connection detected!');
      }
      setIsOnline(navigator.onLine);
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return isOnline;
}
