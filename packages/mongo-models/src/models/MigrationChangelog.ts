import mongoose from 'mongoose';
import { collectionNames } from '@/constants';

const migrationCollection = collectionNames.migrationChangelog;

const MigrationChangelogSchema = new mongoose.Schema(
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

export const MigrationChangelogModel
  = mongoose.models?.[migrationCollection]
  || mongoose.model(
    migrationCollection,
    MigrationChangelogSchema,
    migrationCollection
  );
