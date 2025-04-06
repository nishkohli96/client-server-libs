/**
 * Stripe Products API
 * https://docs.stripe.com/api/products/object?lang=node
 */
import { Router, type Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import stripeService from './service';
import type * as StripeTypedefs from './types';

const stripeRouter = Router();
const subRoutes = ExpressServerEndpoints.stripe.subRoutes;

/* POST /stripe/create-product */
stripeRouter.post(
  `/${subRoutes.createProduct}`,
  async function createProduct(req: StripeTypedefs.CreateProductRequest, res: Response) {
    return await stripeService.createProduct(res, req.body);
  }
);

/* GET /stripe/get-product */
stripeRouter.get(
  `/${subRoutes.getProduct}/:productId`,
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

export { stripeRouter };
