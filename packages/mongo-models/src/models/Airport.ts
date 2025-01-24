import mongoose from 'mongoose';
import { collectionNames } from '@/constants';

const airportsCollection = collectionNames.airport;

const AirportSchema = new mongoose.Schema(
  {
    airport_code: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    airport_name: {
      type: String,
      required: true,
      unique: true
    },
    country_code: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

/**
 * "mongoose.models[airportsCollection] ||" is required to make sure
 * that if the model is already compiled, it does not compile it again,
 * esp when using it with NextJS.
 */
export const AirportModel
  = mongoose.models?.[airportsCollection]
    || mongoose.model(airportsCollection, AirportSchema, airportsCollection);
