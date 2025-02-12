'use strict';

const { tableNames } = require('../table-names');
const carsList = require('../../express-server/src/db/postgres/seeders/data/car-models.json');

/**
 * Somehow using uuidv6 is not working in this seeder.
 * Sequelize’s bulkInsert does not automatically generate defaultValue
 * for UUID columns. Unlike .create(), bulkInsert() does not trigger
 * model-level hooks or default values.
 * 
 * Anyways, its better to define ids in the seeder files itself for consistency
 * across all environments.
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    const carsWithEnumColors = carsList.map(car => ({
      id: car.id,
      name: car.name,
      brand_id: car.brand_id,
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
