/**
 * Stripe Products API
 * https://docs.stripe.com/api/products/object?lang=node
 */

import { Router, type Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import stripeService from './service';
import type * as StripeTypedefs from './types';

const stripeProductRouter = Router();
const subRoutes = ExpressServerEndpoints.stripe.subRoutes.products.subRoutes;

/* POST /stripe/products/create */
stripeProductRouter.post(
  `/${subRoutes.create}`,
  async function createProduct(req: StripeTypedefs.CreateProductRequest, res: Response) {
    return await stripeService.createProduct(res, req.body);
  }
);

/* PATCH /stripe/products/update/:productId */
stripeProductRouter.patch(
  `/${subRoutes.update}/:productId`,
  async function updateProduct(req: StripeTypedefs.UpdateProductRequest, res: Response) {
    return await stripeService.updateProduct(res, req.params, req.body);
  }
);

/* GET /stripe/products/get/:productId */
stripeProductRouter.get(
  `/${subRoutes.get}/:productId`,
  async function getProduct(req: StripeTypedefs.GetProductRequest, res: Response) {
    return await stripeService.getProduct(res, req.params);
  }
);

/* POST /stripe/products/list */
stripeProductRouter.post(
  `/${subRoutes.list}`,
  async function listProducts(req: StripeTypedefs.ListProductsRequest, res: Response) {
    return await stripeService.listProducts(res, req.body);
  }
);

/* GET /stripe/products/search */
stripeProductRouter.get(
  `/${subRoutes.search}`,
  async function searchProducts(req: StripeTypedefs.SearchProductsRequest, res: Response) {
    return await stripeService.searchProducts(res, req.query);
  }
);

/* DELETE /stripe/products/delete/:productId */
stripeProductRouter.delete(
  `/${subRoutes.delete}/:productId`,
  async function deleteProduct(req: StripeTypedefs.GetProductRequest, res: Response) {
    return await stripeService.deleteProduct(res, req.params);
  }
);

export { stripeProductRouter };
