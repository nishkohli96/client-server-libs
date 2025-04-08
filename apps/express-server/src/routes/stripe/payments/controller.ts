/**
 * Stripe Payment Intent API
 * https://docs.stripe.com/api/payment_intents?lang=node
 */

import { Router, type Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import stripePaymentsService from './service';
import type * as StripePaymentTypedefs from './types';

const stripePaymentsRouter = Router();
const subRoutes = ExpressServerEndpoints.stripe.subRoutes.prices.subRoutes;

/* POST /stripe/payments/create */
stripePaymentsRouter.post(
  `/${subRoutes.create}`,
  async function createPaymentIntent(
    req: StripePaymentTypedefs.CreatePaymentIntentRequest,
    res: StripePaymentTypedefs.CreatePaymentIntentResponse
  ) {
    return await stripePaymentsService.createPaymentIntent(res, req.body);
  }
);

export { stripePaymentsRouter };
