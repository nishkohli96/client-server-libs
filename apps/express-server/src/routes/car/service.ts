import { Response } from 'express';
import sequelize from 'sequelize';
import { CarModel } from '@/db/models';
import { sendErrorResponse } from '@/utils';
import * as CarTypeDefs from './types';

/**
 * Sequelize provides a wide range of operators to query the database.
 * https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
 */
class CarService {
  async addCar(res: Response, carData: CarTypeDefs.AddCar) {
    try {
      /**
			 * Sequelize provides the create method, which combines the
			 * build and save methods into a single method.
			 *
			 * Use console.log(carModel.toJSON()) to see the data, and
			 * not the Sequelize instance details.
			 */
      const carModel = await CarModel.create(carData);
      return res.json({
        success: true,
        status: 200,
        message: 'Car added.',
        data: carModel
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to add new car details');
    }
  }

	async listCars(res: Response) {
	  try {
	    const carList = await CarModel.findAll({
	      /**
				 * Attributes are the columns that you want to retrieve from the table.
				 * Attributes can be renamed using a nested array: eg -> colors can be
				 * renamed to availableColors using ['colors', 'availableColors'].
				 *
				 * attributes: { exclude: ['baz'] } -> exclude the column baz.
				 */
	      attributes: [
	        'name',
	        ['colors', 'availableColors'],
	        /* second parameter is the dimension (1 for a 1D array). */
	        [sequelize.literal('array_length("colors", 1)'), 'num_available_colors']
	      ],
	    });
	    return res.json({
	      success: true,
	      status: 200,
	      message: 'List of cars.',
	      data: carList
	    });
	  } catch (error) {
	    return sendErrorResponse(res, error, 'Unable to list cars');
	  }
	}

	async getCarDetails(res: Response, carId: string) {
	  try {
	    const cars = await CarModel.findAll({
	      where: {
	        id: carId
	      }
	    });
	    return res.json({
	      success: true,
	      status: 200,
	      message: 'Car details fetched.',
	      data: cars[0]
	    });
	  } catch (error) {
	    return sendErrorResponse(res, error, 'Unable to fetch car details');
	  }
	}

	async updateCarDetails(res: Response, carId: string, carData: CarTypeDefs.AddCar) {
	  try {
	    await CarModel.update(carData, {
	      where: {
	        id: carId
	      }
	    });
	    return res.json({
	      success: true,
	      status: 200,
	      message: 'Car details updated.',
	      data: null
	    });
	  } catch (error) {
	    return sendErrorResponse(res, error, 'Unable to update car details');
	  }
	}

	async deleteCarDetails(res: Response, carId: string) {
	  try {
	    await CarModel.destroy({
	      where: {
	        id: carId
	      }
	    });
	    return res.json({
	      success: true,
	      status: 200,
	      message: 'Car details deleted.',
	      data: null
	    });
	  } catch (error) {
	    return sendErrorResponse(res, error, 'Unable to delete car details');
	  }
	}
}

export default new CarService();
