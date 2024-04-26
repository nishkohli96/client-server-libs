import { Fragment } from 'react';
import { PageHeading } from '@csl/shared-fe';
import Typography from '@mui/material/Typography';
import { StyledLink } from '@/components';

export default function DatoCMSPage() {
  return (
    <Fragment>
      <PageHeading title="Dato CMS" />
      <Typography sx={{ my: '20px' }}>
        {'Fetching data from client side using '}
        <StyledLink
          text="graphql hooks"
          href="https://www.npmjs.com/package/graphql-hooks"
          newTab
        />
        {' and on server side using datocms api.'}
      </Typography>
      <StyledLink text="Client side fetching" href="/dato-cms/client-fetch" />
      <span style={{ marginLeft: '20px' }}>
        <StyledLink text="Server side fetching" href="/dato-cms/server-fetch" />
      </span>
    </Fragment>
  );
}
