/**
 * Instead of defining all types, queries and mutations in a single
 * schema.graphql file, you can define them in separate files and
 * merge them into a single schema using GraphQL Tools.
 *
 * https://the-guild.dev/graphql/tools
 */

import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const gqlSchemas = loadFilesSync(path.join(__dirname, './*.graphql'));
export const typeDefs = mergeTypeDefs(gqlSchemas);
