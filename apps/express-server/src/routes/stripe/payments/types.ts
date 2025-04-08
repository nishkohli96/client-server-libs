import type { Request, Response } from 'express';
import type Stripe from 'stripe';

export type CreatePaymentIntentBody = Stripe.PaymentIntentCreateParams;
export type CreatePaymentIntentRequest = Request<
  object,
  object,
  CreatePaymentIntentBody
>;
export type CreatePaymentIntentResponse = Response<
  Stripe.Response<Stripe.PaymentIntent>
>;
