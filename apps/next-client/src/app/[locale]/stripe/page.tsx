import { Fragment } from 'react';
import { PageHeading } from '@csl/shared-fe';
import { StripePageLinks } from '@/constants';
import { PageLink } from '@/components';

export default function StripePage() {
  return (
    <Fragment>
      <PageHeading title="Stripe" />
      {StripePageLinks.map((link, idx) => (
        <PageLink text={link.title} href={link.href} key={idx} />
      ))}
    </Fragment>
  );
}
