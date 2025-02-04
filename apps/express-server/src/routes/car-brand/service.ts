import { Response } from 'express';
import { CarBrandModel } from '@/db/postgres/models';
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

	async deleteCarBrand(res: Response, brandId: number) {
	  try {
	    /**
			 * Sequelize automatically casts the string '1' to an integer when performing
			 * the query. This works because PostgreSQL allows implicit type conversion
			 * for certain types, including string to integer.
			 */
	    const carBrandDetails = await CarBrandModel.findOne({
	      where: {
	        id: brandId
	      }
	    });
	    if(!carBrandDetails) {
	      return res.status(404).send({
	        success: false,
	        status: 404,
	        message: 'Car brand details not found.',
	        data: null
	      });
	    }
	    await CarBrandModel.destroy({
	      where: {
	        id: brandId
	      }
	    });
	    return res.json({
	      success: true,
	      status: 200,
	      message: 'Car brand deleted, along with rows in the cars table',
	      data: null
	    });
	  } catch (error) {
	    return sendErrorResponse(res, error, 'Unable to create a new car brand');
	  }
	}
}

export default new CarBrandService();
