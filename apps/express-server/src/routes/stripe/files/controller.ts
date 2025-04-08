/**
 * Stripe Files API
 * https://docs.stripe.com/api/files?lang=node
 */

import { Router } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import stripeFilesService from './service';
import type * as StripeFileTypedefs from './types';

const stripeFilesRouter = Router();
const subRoutes = ExpressServerEndpoints.stripe.subRoutes.files.subRoutes;

/* POST /stripe/files/list */
stripeFilesRouter.post(
  `/${subRoutes.list}`,
  async function getFile(
    req: StripeFileTypedefs.ListFilesRequest,
    res: StripeFileTypedefs.ListFilesResponse
  ) {
    return await stripeFilesService.listFiles(res, req.body);
  }
);

/* GET /stripe/files/get/:fileId */
stripeFilesRouter.get(
  `/${subRoutes.get}/:fileId`,
  async function getFile(
    req: StripeFileTypedefs.GetFileRequest,
    res: StripeFileTypedefs.GetFileResponse
  ) {
    return await stripeFilesService.getFile(res, req.params);
  }
);

export { stripeFilesRouter };
