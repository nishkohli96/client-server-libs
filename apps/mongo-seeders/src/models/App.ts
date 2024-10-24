import { Schema, model } from 'mongoose';

export enum AppSubscription {
  Free = 'FREE',
  Monthly = 'MONTHLY',
  Yearly = 'YEARLY'
}

export type Address = {
  houseNo: number;
  street: string;
  city: string;
  zipCode: string;
  country: string;
};

const AddressSchema = new Schema({
  houseNo: { type: Number, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true }
});

const AppSchema = new Schema(
  {
    app_name: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
    subscription_level: {
      type: String,
      required: true,
      enum: Object.values(AppSubscription)
    },
    website: { type: String, required: true, unique: true },
    support_email: { type: String, required: true },
    release_date: { type: Date, default: Date.now },
    address: { type: AddressSchema, required: true }
  },
  { timestamps: true }
);

export const AppModel = model('Apps', AppSchema, 'Apps');
