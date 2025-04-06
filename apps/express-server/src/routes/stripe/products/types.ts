import { type Request } from 'express';
import type Stripe from 'stripe';

export type CreateProductBody = Stripe.ProductCreateParams;
export type CreateProductRequest = Request<object, object, CreateProductBody>;

export type GetProductBody = {
	productId: string;
};
export type GetProductRequest = Request<GetProductBody>;
