/**
 * Remove all migration records from the "Migration-Changelog"
 * collection, so that migrations can be run again, after seeding
 * the database.
 */

import { MigrationChangelogModel } from '@csl/mongo-models';

export const clearMigrationRecords = async () => {
  console.log('Clearing previous migration records...');
  await MigrationChangelogModel.deleteMany({});
};
