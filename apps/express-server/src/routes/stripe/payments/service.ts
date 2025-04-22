import { type Response } from 'express';
import { stripeSDK } from '@/constants';
import { sendErrorResponse } from '@/utils';
import type * as StripePaymentTypedefs from './types';

class StripePaymentsService {
  /**
   * https://docs.stripe.com/api/payment_intents/create?lang=node
   */
  async createPaymentIntent(
    res: StripePaymentTypedefs.PaymentIntentResponse,
    payload: StripePaymentTypedefs.CreatePaymentIntentBody
  ) {
    try {
      const paymentIntent = await stripeSDK.paymentIntents.create(payload);
      return res.status(200).json(paymentIntent);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error creating new payment intent');
    }
  }

  /**
   * https://docs.stripe.com/api/payment_intents/update?lang=node
   */
  async updatePaymentIntent(
    res: StripePaymentTypedefs.PaymentIntentResponse,
    params: StripePaymentTypedefs.GetPaymentById,
    payload: StripePaymentTypedefs.UpdatePaymentBody
  ) {
    try {
      const paymentIntent = await stripeSDK.paymentIntents.update(
        params.paymentId,
        payload
      );
      return res.status(200).json(paymentIntent);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error updating payment intent');
    }
  }

  /**
   * https://docs.stripe.com/api/payment_intents/retrieve?lang=node
   */
  async getPaymentIntent(
    res: StripePaymentTypedefs.PaymentIntentResponse,
    params: StripePaymentTypedefs.GetPaymentById
  ) {
    try {
      const paymentIntent = await stripeSDK.paymentIntents.retrieve(
        params.paymentId
      );
      return res.status(200).json(paymentIntent);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error getting payment intent');
    }
  }

  /**
   * https://docs.stripe.com/api/payment_intents/capture?lang=node
   */
  async capturePaymentIntent(
    res: StripePaymentTypedefs.PaymentIntentResponse,
    params: StripePaymentTypedefs.GetPaymentById,
    payload: StripePaymentTypedefs.CapturePaymentBody
  ) {
    try {
      const paymentIntent = await stripeSDK.paymentIntents.capture(
        params.paymentId,
        payload
      );
      return res.status(200).json(paymentIntent);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error capturing payment intent');
    }
  }

  /**
   * https://docs.stripe.com/api/payment_intents/confirm?lang=node
   */
  async confirmPaymentIntent(
    res: StripePaymentTypedefs.PaymentIntentResponse,
    params: StripePaymentTypedefs.GetPaymentById,
    payload: StripePaymentTypedefs.ConfirmPaymentBody
  ) {
    try {
      const paymentIntent = await stripeSDK.paymentIntents.confirm(
        params.paymentId,
        payload
      );
      return res.status(200).json(paymentIntent);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error confirming payment intent');
    }
  }

  /**
   * https://docs.stripe.com/api/payment_intents/cancel?lang=node
   */
  async cancelPaymentIntent(
    res: StripePaymentTypedefs.PaymentIntentResponse,
    params: StripePaymentTypedefs.GetPaymentById,
    payload: StripePaymentTypedefs.CancelPaymentBody
  ) {
    try {
      const paymentIntent = await stripeSDK.paymentIntents.cancel(
        params.paymentId,
        payload
      );
      return res.status(200).json(paymentIntent);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error cancelling payment intent');
    }
  }
}

const stripePaymentsService = new StripePaymentsService();
export default stripePaymentsService;
