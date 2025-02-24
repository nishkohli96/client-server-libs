'use client';

import { Fragment, useEffect } from 'react';
import { initMixpanel } from '@/utils';

export default function MixPanelClient() {
  useEffect(() => {
    initMixpanel();
  }, []);

  return <Fragment />;
}
