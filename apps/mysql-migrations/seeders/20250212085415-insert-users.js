'use strict';

const { tableNames } = require('../table-names');
const users = require('../data/users.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const usersList = users.map(user => ({
      ...user,
      preferences: user.preferences ? JSON.stringify(user.preferences) : null,
      tags: user.tags ? JSON.stringify(user.tags) : null,
      created_at: new Date(),
      updated_at: new Date(),
    }));
    await queryInterface.bulkInsert(
      tableNames.user,
      usersList
    );
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(tableNames.user, null, {});
  }
};
