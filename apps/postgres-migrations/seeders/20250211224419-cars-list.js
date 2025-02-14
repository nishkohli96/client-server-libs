'use strict';

const { tableNames } = require('../table-names');
const carsList = require('../../express-server/src/db/postgres/seeders/data/car-models.json');

/**
 * Sequelize’s bulkInsert does not automatically generate defaultValue
 * for UUID columns. Unlike .create(), bulkInsert() does not trigger
 * model-level hooks or default values.
 * 
 * Make sure to add uuid as dependency in package.json, else you get the
 * error that uuidv6 is not a function. Its better to define ids in the
 * seeder files itself for consistency across all environments.
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    const carsWithEnumColors = carsList.map(car => ({
      ...car,
      /**
       * Cast colors to ENUM array, else insertion process would throw error
       * related to type, as well as for an invalid enum value.
       */
      colors: Sequelize.literal(`ARRAY[${car.colors.map(color => `'${color}'`).join(', ')}]::enum_cars_colors[]`),
      created_at: new Date(),
      updated_at: new Date()
    }));
    await queryInterface.bulkInsert(
      tableNames.car,
      carsWithEnumColors
    );
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete(tableNames.car, null, {});
  }
};
