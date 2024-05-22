import { Fragment, ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import { PageContent, PageHeading } from '@csl/shared-fe';

type PageLayoutProps = {
  seoTitle: string;
  children: ReactElement | ReactElement[];
  hidePageTitle?: boolean;
};

export default function PageLayout({
  seoTitle,
  children,
  hidePageTitle
}: PageLayoutProps) {
  return (
    <Fragment>
      <Helmet>
        <title>
          {seoTitle}
        </title>
      </Helmet>
      <PageContent>
        {!hidePageTitle && <PageHeading title={seoTitle} /> }
        {children}
      </PageContent>
    </Fragment>
  );
}
