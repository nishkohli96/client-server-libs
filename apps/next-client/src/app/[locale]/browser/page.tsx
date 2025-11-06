'use client';

import { Fragment, useState, useEffect } from 'react';
import { type IResult } from 'ua-parser-js';
import { JSONTree } from 'react-json-tree';
import { PageHeading, Loading, getDeviceInfo } from '@csl/shared-fe';

export default function BrowserInfoPage() {
  const [deviceInfo, setDeviceInfo] = useState<IResult | null>(null);

  useEffect(() => {
    setDeviceInfo(getDeviceInfo());
  }, []);

  if (!deviceInfo) {
    return <Loading />;
  }

  return (
    <Fragment>
      <PageHeading title="Browser Info" />
      <div className="p-2 bg-blue-400">
        <JSONTree data={deviceInfo} />
      </div>
    </Fragment>
  );
}
