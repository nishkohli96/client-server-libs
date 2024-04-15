import { Fragment, ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageContent } from '@csl/shared-fe';

type PageLayoutProps = {
  seoTitle: string;
  children: ReactElement | ReactElement[];
}

export default function PageLayout({ seoTitle, children }: PageLayoutProps) {
  return (
    <Fragment>
      <Helmet>
        <title>
          {seoTitle}
        </title>
      </Helmet>
      <PageContent>
        { children}
      </PageContent>
    </Fragment>
  );
}
