/**
 * Stripe Prices API
 * https://docs.stripe.com/api/prices/object?lang=node
 */

import type express from 'express';
import { Router, type Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import stripePricesService from './service';
import type * as StripePricesTypedefs from './types';

const stripePricesRouter: express.Router = Router();
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

/* PATCH /stripe/prices/update/:priceId */
stripePricesRouter.patch(
  `/${subRoutes.update}/:priceId`,
  async function updatePrice(
    req: StripePricesTypedefs.UpdatePriceRequest,
    res: Response
  ) {
    return await stripePricesService.updatePrice(res, req.params, req.body);
  }
);

/* POST /stripe/prices/list */
stripePricesRouter.post(
  `/${subRoutes.list}`,
  async function listPrices(
    req: StripePricesTypedefs.ListPricesRequest,
    res: StripePricesTypedefs.ListPricesResponse
  ) {
    return await stripePricesService.listPrices(res, req.body);
  }
);

/* GET /stripe/prices/search */
stripePricesRouter.get(
  `/${subRoutes.search}`,
  async function searchPrices(
    req: StripePricesTypedefs.SearchPricesRequest,
    res: Response
  ) {
    return await stripePricesService.searchPrices(res, req.query);
  }
);

export { stripePricesRouter };
