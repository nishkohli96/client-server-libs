/**
 * Stripe Customers API
 * https://docs.stripe.com/api/customers?lang=node
 */

import type express from 'express';
import { Router } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import stripeCustomersService from './service';
import type * as StripeCustomerTypedefs from './types';

const stripeCustomersRouter: express.Router = Router();
const subRoutes = ExpressServerEndpoints.stripe.subRoutes.customers.subRoutes;

/* POST /stripe/customers/create */
stripeCustomersRouter.post(
  `/${subRoutes.create}`,
  async function createCustomer(
    req: StripeCustomerTypedefs.CreateCustomerRequest,
    res: StripeCustomerTypedefs.StripeCustomerQueryResponse
  ) {
    return await stripeCustomersService.createCustomer(res, req.body);
  }
);

/* PATCH /stripe/customers/update/:customerId */
stripeCustomersRouter.patch(
  `/${subRoutes.update}/:customerId`,
  async function updateCustomer(
    req: StripeCustomerTypedefs.UpdateCustomerRequest,
    res: StripeCustomerTypedefs.StripeCustomerQueryResponse
  ) {
    return await stripeCustomersService.updateCustomer(
      res,
      req.params,
      req.body
    );
  }
);

/* GET /stripe/customers/get/:customerId */
stripeCustomersRouter.get(
  `/${subRoutes.get}/:customerId`,
  async function getCustomer(
    req: StripeCustomerTypedefs.GetCustomerRequest,
    res: StripeCustomerTypedefs.StripeCustomerQueryResponse
  ) {
    return await stripeCustomersService.getCustomer(res, req.params);
  }
);

/* POST /stripe/customers/list */
stripeCustomersRouter.post(
  `/${subRoutes.list}`,
  async function listCustomers(
    req: StripeCustomerTypedefs.ListCustomersRequest,
    res: StripeCustomerTypedefs.ListCustomersResponse
  ) {
    return await stripeCustomersService.listCustomers(res, req.body);
  }
);

/* GET /stripe/customers/search */
stripeCustomersRouter.get(
  `/${subRoutes.search}`,
  async function searchCustomers(
    req: StripeCustomerTypedefs.SearchCustomersRequest,
    res: StripeCustomerTypedefs.SearchCustomersResponse
  ) {
    return await stripeCustomersService.searchCustomers(res, req.query);
  }
);

/* DELETE /stripe/customers/delete/:customerId */
stripeCustomersRouter.delete(
  `/${subRoutes.delete}/:customerId`,
  async function deleteCustomer(
    req: StripeCustomerTypedefs.GetCustomerRequest,
    res: StripeCustomerTypedefs.DeleteCustomerResponse
  ) {
    return await stripeCustomersService.deleteCustomer(res, req.params);
  }
);

export { stripeCustomersRouter };
