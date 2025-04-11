import type { Request, Response } from 'express';
import type Stripe from 'stripe';

export type CreatePriceBody = Stripe.PriceCreateParams;
export type CreatePriceRequest = Request<object, object, CreatePriceBody>;

export type GetPriceById = {
  priceId: string;
};
export type GetPriceRequest = Request<GetPriceById>;

export type UpdatePriceBody = Stripe.PriceUpdateParams;
export type UpdatePriceRequest = Request<GetPriceById, object, UpdatePriceBody>;

export type ListPricesBody = Stripe.PriceListParams;
export type ListPricesRequest = Request<object, object, ListPricesBody>;
export type ListPricesResponse = Response<
  Stripe.Response<Stripe.ApiList<Stripe.Price>>
>;

export type SearchPricesBody = Stripe.PriceSearchParams;
export type SearchPricesRequest = Request<
  object,
  object,
  object,
  SearchPricesBody
>;
export type SearchPricesResponse = Stripe.ApiList<Stripe.Price>;
