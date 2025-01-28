import { Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import { CarModel } from '@/db/models';
import { sendErrorResponse } from '@/utils';
import * as CarTypeDefs from './types';

class CarService {
  async addCar(res: Response, carData: CarTypeDefs.AddCar) {
    try {
      const carModel = CarModel.build(carData);
      const result = await carModel.save();
      return res.json({
        success: true,
        status: 200,
        message: 'Car added.',
        data: result
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to add new car details');
    }
  }
}

export default new CarService();
