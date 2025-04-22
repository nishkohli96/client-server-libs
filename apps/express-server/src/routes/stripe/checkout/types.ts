import type { Request, Response } from 'express';
import type Stripe from 'stripe';

export type CreateCheckoutSessionBody = Stripe.Checkout.SessionCreateParams;
export type CreateCheckoutSessionRequest = Request<
  object,
  object,
  CreateCheckoutSessionBody
>;
export type CreateCheckoutSessionResponse = Response<string>;

export type BuyProductById = {
  productId: string;
};
export type BuyProductRequest = Request<BuyProductById>;
