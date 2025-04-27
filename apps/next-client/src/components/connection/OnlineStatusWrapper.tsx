'use client';

import { Fragment } from 'react';
import { useOnlineStatus, OfflineFallback } from '@csl/shared-fe';

export default function OnlineStatusWrapper({ children }: { children: React.ReactNode }) {
  const isOnline = useOnlineStatus();
  return (
    <Fragment>
      {isOnline ? children : <OfflineFallback />}
    </Fragment>
  );
}
