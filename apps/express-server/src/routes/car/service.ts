import { Response } from 'express';
import sequelize, { Op } from 'sequelize';
import { CarBrandModel, CarModel, CarModelCreationAttributes } from '@/db/postgres/models';
import { sendErrorResponse } from '@/utils';

/**
 * Sequelize provides a wide range of operators to query the database.
 * https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
 */
class CarService {
  async addCar(res: Response, carData: CarModelCreationAttributes) {
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
      const carDetails = await CarModel.create(carData);
      return res.json({
        success: true,
        status: 200,
        message: 'Car added.',
        data: carDetails
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to add new car details');
    }
  }

  async listCars(res: Response) {
    try {
      /**
       * CarBrandModel should have many cars and CarModel should belong
       * to a CarBrand.
       *
       * I've already defined this association in models/car. If an association
       * is aliased (using the as option), you must specify this alias when
       * including the model.
       */

      const carList = await CarModel.findAll({
        where: {
          deleted_at: null
        },
        include: {
          model: CarBrandModel,
          as: 'brand',
          attributes: ['name'],
        },
        /**
         * Attributes are the columns that you want to retrieve from the table.
         * Attributes can be renamed using a nested array: eg -> colors can be
         * renamed to availableColors using ['colors', 'availableColors'].
         *
         * attributes: { exclude: ['baz'] } -> exclude the column baz.
         */
        attributes: [
          'id',
          'name',
          ['colors', 'availableColors'],
          /* second parameter is the dimension (1 for a 1D array). */
          [
            sequelize.literal('array_length("colors", 1)'),
            'num_available_colors'
          ],
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
    carData: CarModelCreationAttributes
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

  /**
   * Soft deletion happens here. To hard-delete record where your model
   * is paranoid, you can force it using the force: true option.
   *
   * await CarModel.destroy({
   *   where: { id: 1 },
   *   force: true,
   * });
   */

  async deleteCarDetails(res: Response, carId: string) {
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

  async deleteCarsList(res: Response) {
    try {
      const { count, rows } = await CarModel.findAndCountAll({
        where: { deleted_at: { [Op.ne]: null } },
        /**
         * By Passing paranoid: false, we are including deleted
         * records in our query
         */
        paranoid: false,
      });
      return res.json({
        success: true,
        status: 200,
        message: 'List of deleted cars.',
        data: {
          nbRecords: count,
          records: rows
        }
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to get list of deleted cars');
    }
  }

  async restoreCarRecord(res: Response, carId: string) {
    try {
      const car = await CarModel.findOne({
        where: {
          id: carId,
        },
        paranoid: false,
      });
      if(!car) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'Car not found.',
          data: null
        });
      }
      const result = await CarModel.restore({
        where: {
          id: carId
        }
      });
      return res.json({
        success: true,
        status: 200,
        message: 'Car row restored.',
        data: result
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to restore car details');
    }
  }
}

const carService = new CarService();
export default carService;
