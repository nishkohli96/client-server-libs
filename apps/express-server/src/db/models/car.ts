import { DataTypes, Model } from 'sequelize';
import { sequelize, shouldAlterTable } from '@/db/config';
import { CarBrandModel } from './car-brand';

export enum CarColors {
  Blue = 'BLUE',
  White = 'WHITE',
  Black = 'BLACK',
  Silver = 'SILVER',
  Grey = 'GREY',
  Red = 'RED'
}

/**
 * If I don't want updatedAt -> updatedAt: false.
 * If I want to rename createdAt -> createdAt: 'createdTimestamp'
 *
 * If the only thing being specified about a column is its
 * data type, the syntax can be shortened:
 *
 * sequelize.define('User', { name: DataTypes.STRING });
 */
class CarModel extends Model {
  declare id: number;
  name!: string;
  brand!: number;
  colors!: CarColors[];

  getFullname() {
    return [this.brand, this.name].join(' ');
  }
}

CarModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    brand: {
      type: DataTypes.NUMBER,
      allowNull: false,
      /* This is a reference to another model */
      references: {
        model: CarBrandModel,
        key: 'id'
      },
      comment: 'This column refers to the id of brand in the car_brand table'
    },
    colors: {
      type: DataTypes.ARRAY(),
      allowNull: false
    }
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'car',
    timestamps: true
  }
);

/**
 * Sync accepts "force" or "alter" option to create or modify table
 * if it exists. The former option will drop the table while the
 * latter performs the necessary changes in the table to make it
 * match the model.
 */
async function createTable() {
  await CarModel.sync({ alter: shouldAlterTable });
}

createTable();

/**
 * To drop a specific model,
 *
 * await CarModel.drop();
 */
