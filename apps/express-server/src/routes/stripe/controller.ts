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

export { stripeRouter };
