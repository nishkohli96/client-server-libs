/**
 * Stripe Products API
 * https://docs.stripe.com/api/products?lang=node
 */

import { Router, type Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import stripeProductsService from './service';
import type * as StripeProductsTypedefs from './types';

const stripeProductRouter = Router();
const subRoutes = ExpressServerEndpoints.stripe.subRoutes.products.subRoutes;

/* POST /stripe/products/create */
stripeProductRouter.post(
  `/${subRoutes.create}`,
  async function createProduct(
    req: StripeProductsTypedefs.CreateProductRequest,
    res: Response
  ) {
    return await stripeProductsService.createProduct(res, req.body);
  }
);

/* PATCH /stripe/products/update/:productId */
stripeProductRouter.patch(
  `/${subRoutes.update}/:productId`,
  async function updateProduct(
    req: StripeProductsTypedefs.UpdateProductRequest,
    res: Response
  ) {
    return await stripeProductsService.updateProduct(res, req.params, req.body);
  }
);

/* GET /stripe/products/get/:productId */
stripeProductRouter.get(
  `/${subRoutes.get}/:productId`,
  async function getProduct(
    req: StripeProductsTypedefs.GetProductRequest,
    res: Response
  ) {
    return await stripeProductsService.getProduct(res, req.params);
  }
);

/* POST /stripe/products/list */
stripeProductRouter.post(
  `/${subRoutes.list}`,
  async function listProducts(
    req: StripeProductsTypedefs.ListProductsRequest,
    res: Response
  ) {
    return await stripeProductsService.listProducts(res, req.body);
  }
);

/* GET /stripe/products/search */
stripeProductRouter.get(
  `/${subRoutes.search}`,
  async function searchProducts(
    req: StripeProductsTypedefs.SearchProductsRequest,
    res: Response
  ) {
    return await stripeProductsService.searchProducts(res, req.query);
  }
);

/* DELETE /stripe/products/delete/:productId */
stripeProductRouter.delete(
  `/${subRoutes.delete}/:productId`,
  async function deleteProduct(
    req: StripeProductsTypedefs.GetProductRequest,
    res: Response
  ) {
    return await stripeProductsService.deleteProduct(res, req.params);
  }
);

export { stripeProductRouter };
