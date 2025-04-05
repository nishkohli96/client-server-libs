import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {
  DateTimeISOTypeDefinition,
  EmailAddressTypeDefinition,
  ObjectIDTypeDefinition,
  UUIDDefinition,
  DateTimeISOResolver,
  EmailAddressResolver,
  ObjectIDResolver,
  UUIDResolver
} from 'graphql-scalars';
import RandomUserAPI from '@/api/randomuser';
import { resolvers } from '@/resolvers';
import { typeDefs } from '@/schema';
import { type GraphQLServerContext } from '@/types';

/**
 * Make sure to also define the Scalars with their appropriate
 * types in codegen.ts.
 *
 * Also you need to explicitly copy .graphql or .gql files in the
 * dist folders as typescript does not handle it.
 */
const server = new ApolloServer<GraphQLServerContext>({
  typeDefs: [
    DateTimeISOTypeDefinition,
    EmailAddressTypeDefinition,
    ObjectIDTypeDefinition,
    UUIDDefinition,
    typeDefs,
  ],
  resolvers: {
    DateTimeISO: DateTimeISOResolver,
    EmailAddress: EmailAddressResolver,
    ObjectID: ObjectIDResolver,
    UUID: UUIDResolver,
    ...resolvers
  },
  /**
   * Server response yields a 200 status code instead of 400
   * on providing invalid variables. To mitigate this regression,
   * use this flag below:
   */
  status400ForVariableCoercionErrors: true
});

/**
 * Passing an ApolloServer instance to the `startStandaloneServer` function:
 * 1. creates an Express app
 * 2. installs your ApolloServer instance as middleware
 * 3. prepares your app to handle incoming requests
 */
async function bootstrap() {
  /**
   * On specifying NODE_ENV=production, the GraphQL playground is
   * disabled.
   */
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    /**
     * You can share data throughout your server's resolvers
     * and plugins using the context like authentication scope,
     * sources for fetching data like database.
     * Your async context function should async and return
     * an object.
     * context: async ({ req, res }) => {}
     *
     * Refer:
     * https://www.apollographql.com/docs/apollo-server/data/context
     * https://www.apollographql.com/docs/apollo-server/data/fetching-rest
     */
    /* eslint-disable @typescript-eslint/require-await */
    context: async () => {
      const { cache } = server;
      /**
       * We create new instances of our data sources with each request,
       * passing in our server's cache.
       */
      return ({
        dataSources: {
          randomUserAPI: new RandomUserAPI({ cache }),
        }
      });
    }
  });
  console.log(`🚀  Server ready at: ${url}`);
}

bootstrap();
