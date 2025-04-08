/**
 * Stripe Prices API
 * https://docs.stripe.com/api/prices/object?lang=node
 */

import { Router, type Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import stripePricesService from './service';
import type * as StripePricesTypedefs from './types';

const stripePricesRouter = Router();
const subRoutes = ExpressServerEndpoints.stripe.subRoutes.prices.subRoutes;

/* POST /stripe/prices/create */
stripePricesRouter.post(
  `/${subRoutes.create}`,
  async function createPrice(
    req: StripePricesTypedefs.CreatePriceRequest,
    res: Response
  ) {
    return await stripePricesService.createPrice(res, req.body);
  }
);

/* GET /stripe/prices/get/:priceId */
stripePricesRouter.get(
  `/${subRoutes.get}/:priceId`,
  async function getPrice(
    req: StripePricesTypedefs.GetPriceRequest,
    res: Response
  ) {
    return await stripePricesService.getPrice(res, req.params);
  }
);

export { stripePricesRouter };
