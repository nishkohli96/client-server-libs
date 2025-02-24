import mixpanel from 'mixpanel-browser';
import { ENV_VARS } from '@/app-constants';

const MIXPANEL_TOKEN = ENV_VARS.mixPanelToken;

export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token is missing! Check your .env file.');
    return;
  }

  mixpanel.init(MIXPANEL_TOKEN);
};
