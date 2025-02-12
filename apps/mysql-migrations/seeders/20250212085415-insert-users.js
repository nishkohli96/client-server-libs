'use strict';

const { tableNames } = require('../table-names');
const users = require('../data/users.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const usersList = users.map(user => ({
      ...user,
      // preferences: user.preferences ? Sequelize.literal(user.preferences) : null,
      // tags: user.tags ? Sequelize.literal(user.tags) : null,
      created_at: new Date(),
      updated_at: new Date()
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
