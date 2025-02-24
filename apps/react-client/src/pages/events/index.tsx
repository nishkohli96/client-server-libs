import Button from '@mui/material/Button';
import { PageLayout } from 'components';
import { socket } from 'socket';
import { mixpanel } from 'utils';

export default function EventsPage() {
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

  function emitMixPanelEvent() {
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
    <PageLayout seoTitle="Events Page">
      <Button onClick={emitMixPanelEvent} variant="contained">
        Trigger Mixpanel Event
      </Button>
      <Button
        variant="contained"
        onClick={emitSocketEvent}
        sx={{ mx: '10px' }}
      >
        Trigger Socket Event
      </Button>
    </PageLayout>
  );
}
