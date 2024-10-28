// In this file you can configure migrate-mongo
require('dotenv').config()
const { collectionNames } = require('@csl/mongo-models');

const config = {
  mongodb: {
    url: process.env.DB_URL,

    databaseName: process.env.DB_NAME,

    options: {
      retryWrites: true,
      minPoolSize: 5,
      // connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      // socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: "./src/migrations",

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: collectionNames.migrationChangelog,

  // The file extension to create migrations and search for in migration dir 
  migrationFileExtension: ".mjs",

  // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determine
  // if the file should be run. Requires that scripts are coded to be run multiple times.
  useFileHash: false,

  // Don't change this, unless you know what you're doing
  moduleSystem: 'esm',
};

module.exports = config;

