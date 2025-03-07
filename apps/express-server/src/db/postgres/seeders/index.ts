/**
 * Consider making a dedicated seeder repo for managing
 * models, seeders and migrations using sequelize.
 *
 * https://sequelize.org/docs/v6/other-topics/migrations/
 *
 * Current implementation will cause error if I uncomment
 * truncate code, due to foreign key constraint
 */

import { winstonLogger } from '@/middleware';
import { connectPostgresDB, disconnectPostgresDB } from '..';
import { CarBrandModel, CarModel } from '../models';
import carBrands from './data/car-brands.json';
import cars from './data/car-models.json';

async function seedData() {
  try {
    /* Connect to the database */
    await connectPostgresDB();

    /* Truncate existing data from tables */
    // await CarModel.truncate();
    winstonLogger.info('Cleared data from cars table');
    // await CarBrandModel.truncate();
    winstonLogger.info('Cleared data from car_brands table');

    /* Insert seeder data into tables */
    await CarBrandModel.bulkCreate(carBrands);
    winstonLogger.info('Inserted data in car_brands table');
    await CarModel.bulkCreate(cars);
    winstonLogger.info('Inserted data in cars table');

    /* Disconnect from the database */
    await disconnectPostgresDB();
    process.exit(0);
  } catch(error) {
    winstonLogger.error(error);
    process.exit(1);
  }
}

seedData();
