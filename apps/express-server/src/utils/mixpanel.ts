import Mixpanel from 'mixpanel';
import { ENV_VARS } from '@/app-constants';

export const mixpanel = Mixpanel.init(ENV_VARS.mixPanelToken);
