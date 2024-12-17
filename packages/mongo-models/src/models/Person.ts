import { Schema, Types, model } from 'mongoose';
import moment from 'moment';
import { collectionNames } from '@/constants';

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Others = 'OTHERS'
}

/**
 * Prefer keeping houseNo as string to handle cases
 * like "101-A", "22B" etc.
 */
export type Address = {
  _id: Types.ObjectId;
  houseNo?: string;
  street?: string;
  city?: string;
  zipCode?: string;
  country?: string;
};

export type Person = {
  _id: Types.ObjectId;
  first_name: string;
  last_name?: string;
  date_of_birth: string | Date | moment.Moment;
  gender: Gender;
  email: string;
  avatar?: string;
  website?: string;
  address?: Address;
  profession?: string;
  salary?: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  fullName?: string;
  fullAddress?: string;
  isDeleted?: boolean;
};

const AddressSchema = new Schema({
  houseNo: String,
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
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    gender: {
      type: String,
      required: true,
      enum: Object.values(Gender)
    },
    avatar: String,
    website: String,
    address: AddressSchema,
    profession: String,
    salary: {
      type: Number,
      min: 0
    },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

// Virtual for fullName
PersonSchema.virtual('fullName').get(function getFullName(this: Person) {
  return `${this.first_name} ${this.last_name || ''}`.trim();
});

// Virtual for fullAddress
PersonSchema.virtual('fullAddress').get(function getFullAddress(this: Person) {
  if (!this.address) {
    return '';
  }
  const { houseNo, street, city, zipCode, country } = this.address;
  const parts = [
    houseNo ? `${houseNo} ${street ?? ''}`.trim() : street,
    city,
    country
  ].filter(Boolean);

  const addressString = parts.join(', ').trim();
  return zipCode ? `${addressString} - ${zipCode}` : addressString;
});

PersonSchema.set('toJSON', { virtuals: true });
PersonSchema.set('toObject', { virtuals: true });

export const PersonModel = model(
  'People',
  PersonSchema,
  collectionNames.people
);
