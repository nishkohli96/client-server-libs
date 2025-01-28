import { Response } from 'express';
import { CarBrandModel } from '@/db/models';
import { sendErrorResponse } from '@/utils';
import * as CarBrandTypeDefs from './types';

class CarBrandService {
  async addCarbrand(res: Response, carBrandData: CarBrandTypeDefs.AddCarBrand) {
    try {
      const carBrand = CarBrandModel.build(carBrandData);
      const result = await carBrand.save();
      return res.json({
        success: true,
        status: 200,
        message: 'Car brand added.',
        data: result
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to create a new car brand');
    }
  }
}

export default new CarBrandService();
