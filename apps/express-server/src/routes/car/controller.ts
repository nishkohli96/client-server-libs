import { Router, type Request, type Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import carService from './service';
import type * as CarTypeDefs from './types';

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
carRouter.get(`/${subRoutes.list}`, async (req, res: Response) => {
  return await carService.listCars(res);
});

/* GET /car/group-by-brand */
carRouter.get(`/${subRoutes.groupByBrand}`, async (req, res: Response) => {
  return await carService.listCarsByBrand(res);
});

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

/* GET /car/deleted-list */
carRouter.get(
  `/${subRoutes.deletedList}`,
  async (req: CarTypeDefs.GetCarDetailsRequest, res: Response) => {
    return await carService.deleteCarsList(res);
  }
);

/* PATCH /car/restore */
carRouter.patch(
  `/${subRoutes.restore}/:carId`,
  async (req: CarTypeDefs.GetCarDetailsRequest, res: Response) => {
    return await carService.restoreCarRecord(res, req.params.carId);
  }
);

/* GET /car/owners-list */
carRouter.get(
  `/${subRoutes.ownersList}`,
  async (req: Request, res: Response) => {
    return await carService.getOwnersList(res);
  }
);

export { carRouter };
