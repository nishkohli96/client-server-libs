import { DataTypes, Model, Sequelize } from 'sequelize';
import { postgreSequelize, shouldAlterTable } from '@/db/config';
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
  declare id: string;
  name!: string;
  brand!: number;
  colors!: CarColors[];
  /** This is a class-level method */
  getFullname() {
    return [this.brand, this.name].join(' ');
  }
}

CarModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      /* This is a reference to another model */
      references: {
        model: CarBrandModel,
        key: 'id'
      },
      comment: 'This column refers to the id of brand in the car_brand table'
    },
    colors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    }
  },
  {
    sequelize: postgreSequelize,
    /**
     * This will prevent the auto-pluralization performed by Sequelize,
     * ie. the table name will be equal to the model name, without
     * any modifications
     */
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
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

export { CarModel };

/**
 * To drop a specific model,
 *
 * await CarModel.drop();
 */
