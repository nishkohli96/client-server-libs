'use client';

import { useEffect } from 'react';
import { logEvent } from 'firebase/analytics';
import { PageHeading } from '@csl/shared-fe';
import { getFirebaseAnalytics } from '@/services/firebase/client-apps';

export default function FirebasePage() {
  useEffect(() => {
    (async () => {
      const analytics = await getFirebaseAnalytics();
      if (analytics) {
        logEvent(analytics, 'page_view', {
          page_title: 'Firebase Page',
          page_location: window.location.href,
          page_path: window.location.pathname
        });
      }
    })();
  }, []);

  return <PageHeading title="Firebase" />;
}
