'use strict';

const carsList = require('../../express-server/src/db/postgres/seeders/data/car-brands.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'cars',
      carsList
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cars', null, {});
  }
};
