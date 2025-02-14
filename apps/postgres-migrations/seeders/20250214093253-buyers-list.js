'use strict';

const { tableNames } = require('../table-names');
const carBuyersList = require('../../express-server/src/db/postgres/seeders/data/car-buyers.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const buyersList = carBuyersList.map(buyer => ({
      ...buyer,
      purchased_on: new Date(),
    }));
    await queryInterface.bulkInsert(
      tableNames.buyer,
      buyersList
    );
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(tableNames.buyer, null, {});
  }
};
