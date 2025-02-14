'use strict';

const { v6: uuidv6 } = require('uuid');
const { tableNames } = require('../table-names');

/**
 * Cannot use TS enums directly in pure js. So its better
 * to define and use Object.values in this case.
 */
const CarColors = Object.freeze({
  Blue: 'BLUE',
  White: 'WHITE',
  Black: 'BLACK',
  Silver: 'SILVER',
  Grey: 'GREY',
  Red: 'RED'
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(tableNames.buyer, {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => uuidv6(),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      car_id: {
        type: Sequelize.UUID,
        references: {
          model: tableNames.car,
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      color: {
        type: Sequelize.ENUM(...Object.values(CarColors)),
        allowNull: false
      },
      purchased_on: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(tableNames.buyer);
  }
};