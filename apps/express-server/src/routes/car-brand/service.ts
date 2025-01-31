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

  async getCarbrands(res: Response) {
    try {
      /**
       * You can also add pagination here in the below method, for example:
       * where: {
       *	 title: {
       *			[Op.like]: 'foo%',
       *		},
       *	},
       *	offset: 10,
       *	limit: 2,
       */

      const { count, rows } = await CarBrandModel.findAndCountAll();
      return res.json({
        success: true,
        status: 200,
        message: 'Car brands listed.',
        data: {
          nbRecords: count,
          records: rows
        }
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to create a new car brand');
    }
  }
}

export default new CarBrandService();
