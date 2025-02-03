import { DataTypes, Model } from 'sequelize';
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
  brand_id!: number;
  colors!: CarColors[];
}

/**
 * Refer complete list of validations here
 * https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#per-attribute-validations
 */

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
      unique: true,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
      },
      allowNull: false,
      /* This is a reference to another model */
      references: {
        model: CarBrandModel,
        key: 'id',
      },
      comment: 'This column refers to the id of brand in the car_brand table'
    },
    colors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        /**
         * Can also be written as
         * isIn: [Object.values(CarColors)]
         */
        isIn: {
          msg: 'Each color must be a valid enum',
          args: [Object.values(CarColors)]
        }
        /**
         * Custom Validation function
         * isEven(value) {
         *   if (parseInt(value) % 2 !== 0) {
         *     throw new Error('Only even values are allowed!');
         *   }
         * }
         */
      },
      /**
       * Getter function. All car colors are stored in uppercase in the DB, but
       * when querying from DB, they are returned in title case. However this won't
       * work in aggregate functions like "listCarsByBrand" function in car.service.ts.
       *
       * This field doesn't allow null values, but for other columns that may allow null
       * values, do consider null handling in the getter function.
       *
       * Similarly, a setter function can be defined to hash the password before storing
       * Sequelize calls the setter automatically, before even sending data to the database
       * set(value) {
       *   this.setDataValue('password', hash(value));
       * },
       */
      get() {
        const rawValue: string[] = this.getDataValue('colors');
        return rawValue.map(
          c => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()
        );
      },
    },
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
    timestamps: true,
    /**
     * Sequelize provides paranoid tables which soft deletes a record
     * by inserting deletedAt timestamp. Timestamps must be enabled to
     * use this feature.
     *
     * await Post.destroy({
     *   where: { id: 1 },
     * });
     *
     */
    paranoid: true,
    deletedAt: 'deleted_at',
    /**
     * Validations can also be defined to check the model after the
     * field-specific validators. Eg -
     *
     * validate: {
     *   bothCoordsOrNone() {
     *     if ((this.latitude === null) !== (this.longitude === null)) {
     *       throw new Error('Either both latitude and longitude, or neither!');
     *     }
     *   }
     * }
     */
  }
);

/* Define the relationship between CarModel and CarBrandModel using optional aliases */
CarModel.belongsTo(CarBrandModel, {
  foreignKey: 'brand_id',
  as: 'brand',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

CarBrandModel.hasMany(CarModel, {
  foreignKey: 'brand_id',
  as: 'cars',
});


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
