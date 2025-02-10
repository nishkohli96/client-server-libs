import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavPill, PageLayout } from 'components';
import { RouteList } from 'routes/route-list';
import { socket } from 'socket';

export default function HomePage() {
  async function emitSocketEvent() {
    try {
      const response = await socket
        .timeout(5000)
        .emitWithAck('submitForm', 'John Doe');
      console.log('response: ', response);
    } catch (error) {
      console.error('❌ No acknowledgment received:', error);
    }
  }
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
      <br />
      <Button onClick={emitSocketEvent} variant="contained">
        Trigger Socket Event
      </Button>
    </PageLayout>
  );
}
