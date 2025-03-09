import path from 'path';
import { readFileSync } from 'fs';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { User, Colors } from '@/types';
import { typeDefs } from './graphql';


// const schemaArray = loadFilesSync(path.join(__dirname, './graphql/*.graphql')); // ✅ Auto-loads all GraphQL files

// const typeDefs = mergeTypeDefs(schemaArray);
// readFileSync(
//   path.join(__dirname, './schema.graphql'), {
//     encoding: 'utf-8'
//   }
// );

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
  typeDefs,
  resolvers
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
