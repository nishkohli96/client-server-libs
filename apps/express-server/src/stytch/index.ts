import stytch from 'stytch';
import { ENV_VARS } from '@/app-constants';

export const stytchClient = new stytch.B2BClient({
  project_id: ENV_VARS.stytch.projectId,
  secret: ENV_VARS.stytch.secret,
});

export const stytchOrgId = ENV_VARS.stytch.orgId;

/**
 * This is the email that will be used to test the Stytch API.
 */
export const stytchTestEmail = ENV_VARS.stytch.testEmail;
