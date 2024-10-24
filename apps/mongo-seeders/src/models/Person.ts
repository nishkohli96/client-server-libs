import { Schema, model } from 'mongoose';

enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
}

const PersonSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      enum: Object.values(Gender),
    },
    weight: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const PersonModel = model('People', PersonSchema, 'Person');
