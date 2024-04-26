import { Fragment } from 'react';
import Link from 'next/link';
import { PageHeading } from '@csl/shared-fe';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function DatoCMSPage() {
  return (
    <Fragment>
      <PageHeading title="Dato CMS" />
      <Typography sx={{ my: '20px' }}>
        Fetching data from client side using
        <Link href="https://www.npmjs.com/package/graphql-hooks" target="_blank">
          <span> graphql hooks </span>
        </Link>
        and on server side using datocms api.
      </Typography>
      <Button variant="contained" sx={{ mr: '20px' }}>
        <Link href="/dato-cms/client-fetch">Client side fetching</Link>
      </Button>
      <Button variant="outlined">
        <Link href="/dato-cms/server-fetch">Server side fetching</Link>
      </Button>
    </Fragment>
  );
}
