import { Schema, Types, model } from 'mongoose';
import { collectionName } from '@/constants/index.mjs';

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Others = 'OTHERS'
}

export type Address = {
  _id: Types.ObjectId;
  houseNo?: number;
  street?: string;
  city?: string;
  zipCode?: string;
  country?: string;
};

export type Person = {
  _id: Types.ObjectId;
  first_name: string;
  last_name?: string;
  date_of_birth: string | Date;
  gender: Gender;
  email: string;
  avatar?: string;
  website?: string;
  address?: Address;
  createdAt: string | Date;
  updatedAt: string | Date;
};

const AddressSchema = new Schema({
  houseNo: Number,
  street: String,
  city: String,
  zipCode: String,
  country: String
});

const PersonSchema = new Schema<Person>(
  {
    first_name: { type: String, required: true },
    last_name: String,
    date_of_birth: { type: Date, default: Date.now },
    email: { type: String, required: true, unique: true },
    gender: {
      type: String,
      required: true,
      enum: Object.values(Gender)
    },
    avatar: String,
    website: String,
    address: AddressSchema
  },
  { timestamps: true }
);

export const PersonModel = model(
  'People',
  PersonSchema,
  collectionName.people
);
