import { Schema, model } from 'mongoose';
import { collectionNames } from '@/constants';

const MigrationChangelogSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    appliedAt: {
      type: Date,
      required: true,
    }
  }
);

export const MigrationChangelogModel = model(
  'MigrationChangelog',
  MigrationChangelogSchema,
  collectionNames.migrationChangelog
);
