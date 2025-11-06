'use client';

/**
 * Since I want to enable analytics on all pages, this component can
 * be used alongside other components on that page, while also ensuring
 * that the page is rendered on the server side, if applicable.
 */
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { useFirebasePageView } from '@/hooks';

type FirebasePageAnalyticsProps = {
  title: string;
};

export default function FirebasePageAnalytics ({
  title,
}: FirebasePageAnalyticsProps) {
  const pathname = usePathname();
  console.log('pathname: ', pathname);
  useFirebasePageView({
    title,
    path: pathname
  });
  return <Fragment />;
}
