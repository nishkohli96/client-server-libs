import type { Request, Response } from 'express';
import type Stripe from 'stripe';

export type CreateCustomerBody = Stripe.CustomerCreateParams;
export type CreateCustomerRequest = Request<object, object, CreateCustomerBody>;

export type StripeCustomerMutationResponse = Response<
  Stripe.Response<Stripe.Customer>
>;
export type StripeCustomerQueryResponse = Response<
  Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>
>;

export type GetCustomerById = {
  customerId: string;
};
export type GetCustomerRequest = Request<GetCustomerById>;

export type UpdateCustomerBody = Stripe.CustomerUpdateParams;
export type UpdateCustomerRequest = Request<
  GetCustomerById,
  object,
  UpdateCustomerBody
>;

export type ListCustomersBody = Stripe.CustomerListParams;
export type ListCustomersRequest = Request<object, object, ListCustomersBody>;
export type ListCustomersResponse = Response<
  Stripe.Response<Stripe.ApiList<Stripe.Customer>>
>;

export type SearchCustomersBody = Stripe.CustomerSearchParams;
export type SearchCustomersRequest = Request<
  object,
  object,
  object,
  SearchCustomersBody
>;
export type SearchCustomersResponse = Response<
  Stripe.ApiSearchResult<Stripe.Customer>
>;

export type DeleteCustomerResponse = Response<
  Stripe.Response<Stripe.DeletedCustomer>
>;
