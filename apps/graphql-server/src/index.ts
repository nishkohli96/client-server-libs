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
import { orders, users, products, categories } from '@/data';
import { typeDefs } from '@/graphql';

const resolvers = {
  Query: {
    getCategories: () => categories,
    getProducts: () => products,
    getUsers: () => users,
    getOrders: () => orders,
  }
};

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
  }
});

/**
 * Passing an ApolloServer instance to the `startStandaloneServer` function:
 * 1. creates an Express app
 * 2. installs your ApolloServer instance as middleware
 * 3. prepares your app to handle incoming requests
 */
async function bootstrap() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  });
  console.log(`🚀  Server ready at: ${url}`);
}

bootstrap();
