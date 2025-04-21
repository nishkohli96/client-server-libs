import { Fragment } from 'react';
import type { Metadata } from 'next';
import { PageHeading } from '@csl/shared-fe';

export const metadata: Metadata = {
  title: 'Stripe',
  description: 'Stripe payment integration example'
};

export default function StripePage() {
  return (
    <Fragment>
      <PageHeading title="Stripe" />
    </Fragment>
  );
}
