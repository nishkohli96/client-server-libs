import path from 'path';
import type { CodegenConfig } from '@graphql-codegen/cli';

/**
 * During the initialization, the schema value was set to
 * 'http://localhost:4000' which means that this server should
 * be running to generate the types. You can also point this to
 * the url of a remote GraphQL server to fetch its schema.
 *
 * Thus you need to set this value to your schema.graphql file, so
 * if you make any changes in this file and run the codegen, the
 * types are regenerated.
 */
const config: CodegenConfig = {
  overwrite: true,
  schema: path.join(__dirname, './schema.graphql'),
  generates: {
    'src/types/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    }
  }
};

export default config;
