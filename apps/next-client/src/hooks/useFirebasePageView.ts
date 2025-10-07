'use client';

/**
 * Caution: If you send manual pageviews without disabling pageview measurement,
 * you may end up with duplicate pageviews. Refer:
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag
 */
import { useEffect } from 'react';
import { logEvent } from 'firebase/analytics';
import firebaseService from '@/services/firebase';

type UseFirebasePageViewProps = {
  title: string;
  path: string;
};

export const useFirebasePageView = ({
  title,
  path,
}: UseFirebasePageViewProps) => {
  useEffect(() => {
    (async () => {
      const analytics = await firebaseService.getAnalyticsInstance();
      if (analytics) {
        logEvent(analytics, 'page_view', {
          page_title: title,
          page_location: window.location.href,
          page_path: path,
        });
      }
    })();
  }, [title, path]);
};
