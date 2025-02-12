'use strict';

/**
 * By default Sequelize does not add timestamp to "SequelizeMeta"
 * table. Add this column to make it easier to track which migration
 * was applied at what time.
 */

const { tableNames } = require('../table-names');
const createdAtColumn = 'applied_at';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(tableNames.metaData, createdAtColumn, {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(tableNames.metaData, createdAtColumn);
  }
};
