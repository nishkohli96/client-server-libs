import { type Response } from 'express';
import { stripeSDK } from '@/constants';
import { sendErrorResponse } from '@/utils';
import type * as StripePaymentTypedefs from './types';

class StripePricesService {
  async createPaymentIntent(
    res: StripePaymentTypedefs.CreatePaymentIntentResponse,
    payload: StripePaymentTypedefs.CreatePaymentIntentBody
  ): Promise<Response> {
    try {
      const paymentIntent = await stripeSDK.paymentIntents.create(payload);
      return res.status(200).json(paymentIntent);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error creating new payment intent');
    }
  }
}

const stripePaymentsService = new StripePricesService();
export default stripePaymentsService;
