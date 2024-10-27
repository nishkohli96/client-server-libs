import { Schema, Types, model } from 'mongoose';
import { collectionNames } from '@/constants';

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
  profession?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  fullName?: string;
  fullAddress?: string;
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
    address: AddressSchema,
    profession: String
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
  return `${houseNo ?? ''} ${street ?? ''},${city ?? ''},${country ?? ''} ${zipCode ? `- ${zipCode}` : ''}`
    .replaceAll(',,', ',')
    .trim();
});

PersonSchema.set('toJSON', { virtuals: true });
PersonSchema.set('toObject', { virtuals: true });

export const PersonModel = model(
  'People',
  PersonSchema,
  collectionNames.people
);

