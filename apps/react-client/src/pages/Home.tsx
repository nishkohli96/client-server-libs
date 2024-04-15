import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import { NavPill, PageLayout } from 'components';
import { RouteList } from 'routes/route-list';

export default function HomePage() {
  return (
    <PageLayout seoTitle="Home Page">
      <Typography variant="h5" color="error" sx={{ mb: '20px' }}>
        Hello from the Home Page of CRA !
      </Typography>
      <Fragment>
        {RouteList.map(route => (
          <NavPill
            text={route.text}
            pathName={route.path}
            key={route.path.replace('/', '')}
          />
        ))}
      </Fragment>
    </PageLayout>
  );
}
