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
       *
       * Model.bulkCreate(records) method inserts multiple records at once,
       * with only one query.
       * Pass { validate: true } as 2nd arg in the above method to validate
       * each record, which the method doesnt do by default. However, passing
       * this arg will slow down the bulk insert operation.
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
          [
            sequelize.literal('array_length("colors", 1)'),
            'num_available_colors'
          ]
        ],
        /**
         * https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#ordering
         */
        order: [['created_at', 'DESC']]
      });

      /**
       * If not using grouping,
       * https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findandcountall
       */
      const totalCount = await CarModel.count();
      return res.json({
        success: true,
        status: 200,
        message: 'List of cars.',
        data: {
          nbRecords: totalCount,
          records: carList
        }
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to list cars');
    }
  }

  async listCarsByBrand(res: Response) {
    try {
      /**
       * In this case, when using group in findAndCountAll, the count will
       * be an array like,
       * [
       *   {
       *     "brand_id": 1,
       *     "count": 2
       *   },
       * ]
       */
      const { count, rows } = await CarModel.findAndCountAll({
        attributes: [
          'brand_id',
          [sequelize.fn('COUNT', sequelize.col('id')), 'carCount'],
          /**
           * This will put all the rows into cars array, with the name and colors.
           * The field name in quotes is the key for the JSON object.
           */
          [
            sequelize.fn(
              'JSON_AGG',
              sequelize.literal(
                'json_build_object(\'name\', name, \'colors\', colors)'
              )
            ),
            'cars'
          ]
        ],
        group: ['brand_id'],
      });
      return res.json({
        success: true,
        status: 200,
        message: 'List of cars.',
        data: {
          nbRecords: count,
          records: rows
        }
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to list cars by brand');
    }
  }

  async getCarDetails(res: Response, carId: string) {
    /**
     * const [results, metadata] = await postgreSequelize.query(
     *   'UPDATE users SET y = 42 WHERE x = 12'
     * );
     * where postgreSequelize is the new Sequelize instance.
     *
     * Read more -
     * https://sequelize.org/docs/v6/core-concepts/raw-queries/
     */
    try {
      const car = await CarModel.findOne({
        where: {
          id: carId
        }
      });
      if(!car) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'Car not found.',
          data: null
        });
      }
      return res.json({
        success: true,
        status: 200,
        message: 'Car details fetched.',
        data: car
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to fetch car details');
    }
  }

  async updateCarDetails(
    res: Response,
    carId: string,
    carData: CarTypeDefs.AddCar
  ) {
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
