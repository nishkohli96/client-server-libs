import { DataTypes } from 'sequelize';
import { postgreSequelize } from '@/db/postgres/config';

export const CarBrandModel = postgreSequelize.define(
  /* Here, 'CarBrand' is the model name */
  'carBrand',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: 'car_brands'
    /**
     * To disable timestamps, pass the below option -
     * timestamps: false
     *
     * Or, If you don't want createdAt
     * createdAt: false,
     *
     * Sequelize manages the timestamps, so direct SQL queries used
     * without sequelize won't update these values.
     *
     */
    /**
     * SCOPE -> Scopes are used to help you reuse code. You can define
     * commonly used queries, specifying options such as
     * where, include, limit, etc.
     *
     * https://sequelize.org/docs/v6/other-topics/scopes/
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
