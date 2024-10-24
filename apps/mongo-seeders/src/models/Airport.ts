import { Schema, model } from 'mongoose';

const AirportSchema = new Schema(
  {
    airport_code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    airport_name: {
      type: String,
      required: true,
      unique: true,
    },
    country_code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const AirportModel = model('Airports', AirportSchema, 'Airports');
