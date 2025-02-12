'use strict';

const { tableNames } = require('../table-names');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(tableNames.user, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      preferences: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: null
      },
      tags: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: null
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 18,
          max: 75
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      deleted_at: {
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(tableNames.user);
  }
};