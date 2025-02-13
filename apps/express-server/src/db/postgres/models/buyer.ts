/* eslint-disable no-use-before-define */

import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { v6 as UUIDv6 } from 'uuid';
import { postgreSequelize } from '@/db/postgres';
import { CarBrandModel } from './car-brand';
import { CarModel, CarColors } from './car';

export type BuyerModelAttributes = InferAttributes<BuyerModel>;
export type BuyerModelCreationAttributes = InferCreationAttributes<BuyerModel>;

class BuyerModel extends Model<BuyerModelAttributes, BuyerModelCreationAttributes> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare car_id: string;
  declare color: CarColors;
  declare purchased_on: CreationOptional<Date>;
}

BuyerModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => UUIDv6(),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    car_id: {
      type: DataTypes.UUID,
      validate: {
        isUUID: 6,
      },
      allowNull: false,
      references: {
        model: CarModel,
        key: 'id',
      },
    },
    color: {
      type: DataTypes.ENUM(...Object.values(CarColors)),
      allowNull: false,
    },
    purchased_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    sequelize: postgreSequelize,
    timestamps: true,
    createdAt: 'purchased_on',
    updatedAt: false,
    modelName: 'buyer',
  }
);

BuyerModel.belongsTo(CarModel, {
  foreignKey: 'car_id',
  as: 'carDetails',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

CarModel.hasMany(BuyerModel, {
  foreignKey: 'car_id',
  as: 'buyers',
});

export { BuyerModel };
