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

/* GET /stripe/products/get/:productId */
stripeProductRouter.get(
  `/${subRoutes.get}/:productId`,
  async function getProduct(req: StripeTypedefs.GetProductRequest, res: Response) {
    return await stripeService.getProduct(res, req.params);
  }
);

// /* PATCH /stripe/update-product */
// stripeRouter.patch(
//   `/${subRoutes.updateProduct}/:productId`,
//   async function updateProduct(req: StripeTypedefs.CreateProductRequest, res: Response) {
//     return await stripeService.updateProduct(res, req.body);
//   }
// );

export { stripeProductRouter };
