import { type Request } from 'express';
import type Stripe from 'stripe';

export type CreatePriceBody = Stripe.PriceCreateParams;
export type CreatePriceRequest = Request<object, object, CreatePriceBody>;

export type GetPriceById = {
  priceId: string;
};
export type GetPriceRequest = Request<GetPriceById>;
