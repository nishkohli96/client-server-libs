import Mixpanel from 'mixpanel';
import { ENV_VARS } from '@/app-constants';

export const mixpanel = Mixpanel.init(ENV_VARS.mixPanelToken, {
  host: 'api-in.mixpanel.com',
  geolocate: false
});

/**
 * Prefer tracking user activities on the server side as much as possible.
 * You can use same Ids from database to set up the same user ids in mixpanel.
 *
 * mixpanel.people.set('y83ey3ey23he', {
 *   $name: 'David',
 *	 $email: 'david.jacob@gmail.com',
 *	 Age: 56
 * });
 *
 * User device details and location can be tracked on the client side.
 *
 * For other types of Profile Updates, refer:
 * https://docs.mixpanel.com/docs/tracking-methods/sdks/nodejs#other-types-of-profile-updates
 */
