import { readdirSync } from 'fs';
import path from 'path';
import type { CodegenConfig } from '@graphql-codegen/cli';

/* Read only ".graphql" files from graphql directory. */
const schemaArray = readdirSync(path.join(__dirname, 'graphql'))
  .filter(fileName => fileName.endsWith('.graphql'))
  .map(fileName => path.join(__dirname, 'graphql', fileName));

/**
 * During the initialization, the schema value was set to
 * 'http://localhost:4000' which means that this server should
 * be running to generate the types. You can also point this to
 * the url of a remote GraphQL server to fetch its schema.
 *
 * Thus you need to set this value to your schema.graphql file, so
 * if you make any changes in this file and run the codegen, the
 * types are regenerated.
 *
 * NOTE: If you get any error wrt "VoidFunction", ensure lib in
 * tsconfig.json includes "dom".
 */

const config: CodegenConfig = {
  overwrite: true,
  schema: schemaArray,
  generates: {
    'src/types/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    }
  }
};

export default config;
