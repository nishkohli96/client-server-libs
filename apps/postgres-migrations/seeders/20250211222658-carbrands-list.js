'use strict';

const { tableNames } = require('../table-names');
const carBrandsList = require('../../express-server/src/db/postgres/seeders/data/car-brands.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Optional 3rd arg for bulkUpdate & bulkDelete:
     * Additional options like transaction, ignoreDuplicates
     */
    await queryInterface.bulkInsert(
      tableNames.carBrands,
      carBrandsList
    );
  },
  async down (queryInterface, Sequelize) {
    /**
     * Here 2nd arg is the where condition. Eg:
     * 
     * await queryInterface.bulkDelete('Users', {
     *   email: 'john@example.com'
     * }, {});
     */
    await queryInterface.bulkDelete(tableNames.carBrands, null, {});
  }
};
