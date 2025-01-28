import { Router, Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import carService from './service';
import * as CarTypeDefs from './types';

const carRouter = Router();
const subRoutes = ExpressServerEndpoints.car.subRoutes;

carRouter.post(
  `/${subRoutes.add}`,
  async (req: CarTypeDefs.AddCarRequest, res: Response) => {
    return await carService.addCar(res, req.body);
  }
);

carRouter.get(
  ExpressServerEndpoints.car.subRoutes.list,
  (req, res: Response) => {
    res.send('Car list');
  }
);

export { carRouter };
