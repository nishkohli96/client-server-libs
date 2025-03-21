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
import { resolvers } from '@/resolvers';
import { typeDefs } from '@/schema';

/**
 * Make sure to also define the Scalars with their appropriate
 * types in codegen.ts
 */
const server = new ApolloServer({
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
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    /**
     * You can share data throughout your server's resolvers
     * and plugins using the context like authentication scope,
     * sources for fetching data etc.
     * Your async context function should async and return
     * an object. Refer:
     * https://www.apollographql.com/docs/apollo-server/data/context
     */
    // context: async ({ req, res }) => ({
    //   authScope: getScope(req.headers.authorization),
    // }),
  });
  console.log(`🚀  Server ready at: ${url}`);
}

bootstrap();
