import { Router, Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import buyerService from './service';
import * as BuyerTypeDefs from './types';

const buyerRouter = Router();
const subRoutes = ExpressServerEndpoints.buyer.subRoutes;

/* POST /buyers/purchase */
buyerRouter.post(
  `/${subRoutes.purchase}`,
  async (req: BuyerTypeDefs.AddPurchaseRequest, res: Response) => {
    return await buyerService.createPurchase(res, req.body);
  }
);

/* GET /buyers/purchase-details */

export { buyerRouter };
