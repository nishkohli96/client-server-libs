import type { Request, Response } from 'express';
import type Stripe from 'stripe';

export type CreatePaymentIntentBody = Stripe.PaymentIntentCreateParams;
export type CreatePaymentIntentRequest = Request<
  object,
  object,
  CreatePaymentIntentBody
>;
export type PaymentIntentResponse = Response<
  Stripe.Response<Stripe.PaymentIntent>
>;

export type GetPaymentById = {
  paymentId: string;
};
export type GetPaymentRequest = Request<GetPaymentById>;

export type UpdatePaymentBody = Stripe.PaymentIntentUpdateParams;
export type UpdatePaymentRequest = Request<
  GetPaymentById,
  object,
  UpdatePaymentBody
>;

export type CapturePaymentBody = Stripe.PaymentIntentCaptureParams;
export type CapturePaymentRequest = Request<
  GetPaymentById,
  object,
  CapturePaymentBody
>;

export type ConfirmPaymentBody = Stripe.PaymentIntentConfirmParams;
export type ConfirmPaymentRequest = Request<
  GetPaymentById,
  object,
  ConfirmPaymentBody
>;

export type CancelPaymentBody = Stripe.PaymentIntentCancelParams;
export type CancelPaymentRequest = Request<
  GetPaymentById,
  object,
  CancelPaymentBody
>;
