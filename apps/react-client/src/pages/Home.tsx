import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useOnlineStatus } from '@csl/shared-fe';
import { NavPill, PageLayout } from 'components';
import { RouteList } from 'routes/route-list';
import { socket } from 'socket';
import { mixpanel } from 'utils';

export default function HomePage() {
  useOnlineStatus();
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

  async function emitMixPanelEvent() {
    /**
     * This gave me a 'Sign Up Click' with Distinct ID: 'y83ey3ey23he',
     * which is the same as the userId. $name and $email are values
     * appearing in the users table in Mixpanel. If i send email instead of
     * $email, the email column value for that user would be undefined.
     */
    mixpanel.identify('y83ey3ey23he');
    mixpanel.people.set({
      '$name': 'Harrison Johnson',
      '$email': 'Harrison.Johnson@ymail.com',
      plan: 'Basic',
      prefs: { theme: 'dark', foo: { bar: 'baz' } }
    });
    mixpanel.track('Sign Up Click', {
      'Signup Type': 'Referral',
      foos: {
        dr: 34,
        frw: {
          ewd: '32ede',
          er: 23
        }
      }
    });
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
      <Button onClick={emitMixPanelEvent} variant="contained">
        Trigger Mixpanel Event
      </Button>
      <Button onClick={emitSocketEvent} variant="contained">
        Trigger Socket Event
      </Button>
    </PageLayout>
  );
}
