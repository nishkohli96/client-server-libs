/**
 * Stripe Checkout Session API
 * https://docs.stripe.com/api/checkout/sessions?lang=node
 */

import { Router, type Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import stripeCheckoutService from './service';
import type * as StripeCheckoutTypedefs from './types';

const stripeCheckoutRouter = Router();
const subRoutes = ExpressServerEndpoints.stripe.subRoutes.checkout.subRoutes;

/* POST /stripe/checkout/create-session */
stripeCheckoutRouter.post(
  `/${subRoutes.createSession}`,
  async function createSession(
    req: StripeCheckoutTypedefs.CreateCheckoutSessionRequest,
    res: Response
  ) {
    return await stripeCheckoutService.createSession(res, req.body);
  }
);

export { stripeCheckoutRouter };
