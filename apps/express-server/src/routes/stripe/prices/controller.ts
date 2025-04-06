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

export { stripePricesRouter };
