import { Router, Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import carBrandService from './service';
import * as CarBrandTypeDefs from './types';

const carBrandRouter = Router();
const subRoutes = ExpressServerEndpoints.carBrand.subRoutes;

/* POST /car-brand/add */
carBrandRouter.post(
  `/${subRoutes.add}`,
  async (req: CarBrandTypeDefs.AddCarModelRequest, res: Response) => {
    return await carBrandService.addCarbrand(res, req.body);
  }
);

/* GET /car-brand/list */
carBrandRouter.get(
  `/${subRoutes.list}`,
  async (req: CarBrandTypeDefs.AddCarModelRequest, res: Response) => {
    return await carBrandService.getCarbrands(res);
  }
);


export { carBrandRouter };
