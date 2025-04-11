/**
 * Stripe Payment Intent API
 * https://docs.stripe.com/api/payment_intents?lang=node
 */

import { Router, type Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import stripePaymentsService from './service';
import type * as StripePaymentTypedefs from './types';

const stripePaymentsRouter = Router();
const subRoutes = ExpressServerEndpoints.stripe.subRoutes.payments.subRoutes;

/* POST /stripe/payments/create */
stripePaymentsRouter.post(
  `/${subRoutes.create}`,
  async function createPaymentIntent(
    req: StripePaymentTypedefs.CreatePaymentIntentRequest,
    res: StripePaymentTypedefs.PaymentIntentResponse
  ) {
    return await stripePaymentsService.createPaymentIntent(res, req.body);
  }
);

/* PATCH /stripe/payments/update/:paymentId */
stripePaymentsRouter.patch(
  `/${subRoutes.update}/:paymentId`,
  async function createPaymentIntent(
    req: StripePaymentTypedefs.UpdatePaymentRequest,
    res: StripePaymentTypedefs.PaymentIntentResponse
  ) {
    return await stripePaymentsService.updatePaymentIntent(
      res,
      req.params,
      req.body
    );
  }
);

/* GET /stripe/payments/get/:paymentId */
stripePaymentsRouter.get(
  `/${subRoutes.get}/:paymentId`,
  async function getPaymentIntent(
    req: StripePaymentTypedefs.GetPaymentRequest,
    res: StripePaymentTypedefs.PaymentIntentResponse
  ) {
    return await stripePaymentsService.getPaymentIntent(res, req.params);
  }
);

/* POST /stripe/payments/capture/:paymentId */
stripePaymentsRouter.post(
  `/${subRoutes.capture}/:paymentId`,
  async function capturePaymentIntent(
    req: StripePaymentTypedefs.CapturePaymentRequest,
    res: StripePaymentTypedefs.PaymentIntentResponse
  ) {
    return await stripePaymentsService.capturePaymentIntent(
      res,
      req.params,
      req.body
    );
  }
);

/* POST /stripe/payments/confirm/:paymentId */
stripePaymentsRouter.post(
  `/${subRoutes.confirm}/:paymentId`,
  async function confirmPaymentIntent(
    req: StripePaymentTypedefs.ConfirmPaymentRequest,
    res: StripePaymentTypedefs.PaymentIntentResponse
  ) {
    return await stripePaymentsService.confirmPaymentIntent(
      res,
      req.params,
      req.body
    );
  }
);

/* POST /stripe/payments/cancel/:paymentId */
stripePaymentsRouter.post(
  `/${subRoutes.cancel}/:paymentId`,
  async function cancelPaymentIntent(
    req: StripePaymentTypedefs.CancelPaymentRequest,
    res: StripePaymentTypedefs.PaymentIntentResponse
  ) {
    return await stripePaymentsService.cancelPaymentIntent(
      res,
      req.params,
      req.body
    );
  }
);

export { stripePaymentsRouter };
