import { Fragment } from 'react';
import { PageHeading } from '@csl/shared-fe';
import { FirebasePageAnalytics } from '@/components';

export default function FirebasePage() {
  return (
    <Fragment>
      <FirebasePageAnalytics
        title="Firebase Page"
      />
      <PageHeading title="Firebase" />
    </Fragment>
  );
}
