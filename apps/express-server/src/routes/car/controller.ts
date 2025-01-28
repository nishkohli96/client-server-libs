import { Router, Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import carService from './service';
import * as CarTypeDefs from './types';

const carRouter = Router();
const subRoutes = ExpressServerEndpoints.car.subRoutes;

/* POST /car/add */
carRouter.post(
  `/${subRoutes.add}`,
  async (req: CarTypeDefs.AddCarRequest, res: Response) => {
    return await carService.addCar(res, req.body);
  }
);

/* GET /car/list */
carRouter.get(
  `/${subRoutes.list}`,
  async (req, res: Response) => {
    return await carService.listCars(res);
  }
);

/* GET /car/details */
carRouter.get(
  `/${subRoutes.details}/:carId`,
  async (req: CarTypeDefs.GetCarDetailsRequest, res: Response) => {
    return await carService.getCarDetails(res, req.params.carId);
  }
);

/* PUT /car/update */
carRouter.put(
  `/${subRoutes.update}/:carId`,
  async (req: CarTypeDefs.UpdateCarDetailsRequest, res: Response) => {
    return await carService.updateCarDetails(res, req.params.carId, req.body);
  }
);

/* DELETE /car/delete */
carRouter.delete(
  `/${subRoutes.delete}/:carId`,
  async (req: CarTypeDefs.GetCarDetailsRequest, res: Response) => {
    return await carService.deleteCarDetails(res, req.params.carId);
  }
);

export { carRouter };
