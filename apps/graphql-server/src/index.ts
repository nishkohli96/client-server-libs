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
import { typeDefs } from '@/graphql';
import { User, Colors } from '@/types';

const users: User[] = [
  {
    name: 'The Awakening',
    age: 32,
    favouriteColor: Colors.Red
  },
  {
    name: 'City of Glass',
    age: 25
  }
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    users: () => users
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: [
    typeDefs,
    DateTimeISOTypeDefinition,
    EmailAddressTypeDefinition,
    ObjectIDTypeDefinition,
    UUIDDefinition,
  ],
  resolvers: {
    DateTimeISOResolver,
    EmailAddressResolver,
    ObjectIDResolver,
    UUIDResolver,
    ...resolvers
  }
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
async function bootstrap() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  });
  console.log(`🚀  Server ready at: ${url}`);
}

bootstrap();
