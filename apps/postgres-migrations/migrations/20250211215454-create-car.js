'use strict';

const { v6: uuidv6 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * enum name must follow the format:
     * enum_<table_name>_<col_name>
     * 
     * Create ENUM Type for Colors.
     **/
    await queryInterface.sequelize.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_car_colors') THEN
          CREATE TYPE "enum_car_colors" AS ENUM ('BLUE', 'WHITE', 'BLACK', 'SILVER', 'GREY', 'RED');
        END IF;
      END $$;
    `);
    await queryInterface.createTable('cars', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuidv6(),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          /* Must match tableName */
          model: 'car_brands',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      colors: {
        type: Sequelize.ARRAY(Sequelize.ENUM('BLUE', 'WHITE', 'BLACK', 'SILVER', 'GREY', 'RED')),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('cars');
  },
};
