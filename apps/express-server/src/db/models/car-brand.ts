import { DataTypes } from 'sequelize';
import { sequelize } from '@/db/config';

export const CarBrandModel = sequelize.define(
  'CarBrand',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'INDIA'
    }
    /**
     * the current date/time will be used to populate this column
     * (at the moment of insertion)
     *
     * sequelize.define('Foo', {
     *   bar: {
     * 	   type: DataTypes.DATETIME,
     * 	   defaultValue: DataTypes.NOW,
     *   },
     * });
     */
  },
  {
    /**
     * This will prevent the  auto-pluralization performed by Sequelize,
     * ie. the table name will be equal to the model name, without
     * any modifications
     */
    freezeTableName: true,
    tableName: 'car_brand'
    /**
     * To disable timestamps, pass the below option -
     * timestamps: false
     *
     * Sequelize manages the timestamps, so direct SQL queries used
     * without sequelize won't update these values.
     */
  }
);

/**
 * You can use sequelize.sync() to automatically synchronize all models.
 * This will run .sync() only if database name ends with '_test'
 *
 * Example: await sequelize.sync({ force: true, match: /_test$/ });
 *
 *
 * To drop all models -
 * await sequelize.drop();
 */
