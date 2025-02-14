'use strict';

const { tableNames } = require('../table-names');
const users = require('../data/users.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const usersList = users.map(user => ({
      ...user,
      is_active: user.is_active !== undefined ? user.is_active : true,
      preferences: user.preferences ? JSON.stringify(user.preferences) : null,
      tags: user.tags ? JSON.stringify(user.tags) : null
    }));
    await queryInterface.bulkInsert(tableNames.user, usersList);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(tableNames.user, null, {});
  }
};
