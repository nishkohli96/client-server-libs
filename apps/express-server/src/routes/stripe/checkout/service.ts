import type { Response } from 'express';
import { stripeSDK } from '@/constants';
import { sendErrorResponse } from '@/utils';
import type * as StripeCheckoutTypedefs from './types';

class StripeCheckoutService {
  async createSession(
    res: Response,
    body: StripeCheckoutTypedefs.CreateCheckoutSessionBody
  ) {
    try {
      const checkoutSession = await stripeSDK.checkout.sessions.create(body);
      return res.redirect(checkoutSession.url ?? '');
    } catch (error) {
      return sendErrorResponse(res, error, 'Error creating new customer');
    }
  }
}

const stripeCheckoutService = new StripeCheckoutService();
export default stripeCheckoutService;
