import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import { NavPill, PageLayout } from 'components';
import { RouteList } from 'routes/route-list';

export default function HomePage() {
  return (
    <PageLayout seoTitle="Home Page" hidePageTitle>
      <Typography variant="h5" color="error">
        Hello from the Home Page of CRA !
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: '20px',
          mt: '30px'
        }}
      >
        Click on any of the links below to see their demo
      </Typography>
      <Fragment>
        {RouteList.filter(route => !route.hideFromHomePage).map(route => (
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
