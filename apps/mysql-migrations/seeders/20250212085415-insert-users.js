'use strict';

const { tableNames } = require('../table-names');
const usersList = require('../../express-server/src/db/postgres/seeders/data/car-brands.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(
      tableNames.user,
      usersList
    );
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(tableNames.user, null, {});
  }
};
