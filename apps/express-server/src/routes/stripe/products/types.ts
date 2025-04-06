import { type Request } from 'express';
import type Stripe from 'stripe';

export type CreateProductBody = Stripe.ProductCreateParams;
export type CreateProductRequest = Request<object, object, CreateProductBody>;

export type GetProductById = {
	productId: string;
};
export type GetProductRequest = Request<GetProductById>;

export type UpdateProductBody = Stripe.ProductUpdateParams;
export type UpdateProductRequest = Request<GetProductById, object, UpdateProductBody>;

export type ListProductsBody = Stripe.ProductListParams;
export type ListProductsRequest = Request<object, object, ListProductsBody>;

export type SearchProductsBody = Stripe.ProductSearchParams;
export type SearchProductsRequest = Request<object, object, object, SearchProductsBody>;
