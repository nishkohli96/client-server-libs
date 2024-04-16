import { GraphQLClient } from 'graphql-hooks';
import memCache from 'graphql-hooks-memcache';
import { ENV_VARS } from '@/app-constants';

export const datoCmsClient = new GraphQLClient({
  url: 'https://graphql.datocms.com/',
  headers: { Authorization: `Bearer ${ENV_VARS.dataCMS_apiKey}` },
  cache: memCache(),
  ssrMode: true
});
