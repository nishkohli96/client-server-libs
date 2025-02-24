import mixpanel from 'mixpanel-browser';
import { ENV_VARS } from 'app-constants';

/* Near entry of your product, init Mixpanel */
mixpanel.init(ENV_VARS.mixPanelToken, {
  debug: true,
  track_pageview: true,
  persistence: 'localStorage'
});

export { mixpanel };
