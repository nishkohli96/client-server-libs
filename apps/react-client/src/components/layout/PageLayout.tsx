import { Fragment, ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';

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
      <Box sx={{
        padding: {
          xs: '25px',
          md: '20px 25px'
        }
      }}
      >
        {children}
      </Box>
    </Fragment>
  );
}
