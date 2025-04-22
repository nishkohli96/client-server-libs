import Stripe from 'stripe';
import { ENV_VARS } from '@/constants';

/**
 * Stripe client instance.
 * @see https://stripe.com/docs/api?lang=node
 *
 * You can also customise the apiVersion, timeout or hostname
 * using the configuration options.
 * https://www.npmjs.com/package/stripe#configuration
 */
export const stripeSDK = new Stripe(ENV_VARS.stripeSecretKey);
