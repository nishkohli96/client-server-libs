/* eslint-disable no-use-before-define */

import {
  Model,
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes
} from 'sequelize';
import { mySQLSequelize } from '@/db/mysql';

export type UserModelAttributes = InferAttributes<UserModel>;
export type UserModelCreationAttributes = InferCreationAttributes<UserModel>;

class UserModel extends Model<
  UserModelAttributes,
  UserModelCreationAttributes
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare isActive: CreationOptional<boolean>;
  declare preferences: object | null;
  declare tags: string[] | null;
  declare age: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    preferences: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },
    /* Arrays are not supported in MySQL */
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 18,
        max: 75
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize: mySQLSequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    /**
     * If using this setting, the column names will be stored in snake_case.
     * However when querying data, the results will be obtained in the camelCase.
     */
    underscored: true,
    defaultScope: {
      where: {
        isActive: true
      }
    },
    scopes: {
      inactiveUsers: {
        where: {
          isActive: false
        }
      }
    }
  }
);

const InactiveUserModel = UserModel.scope('inactiveUsers');

export { UserModel, InactiveUserModel };
