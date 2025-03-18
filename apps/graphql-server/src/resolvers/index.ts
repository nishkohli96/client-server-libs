import { merge } from 'lodash';
import { orderResolver } from './order';
import { productResolver } from './product';
import { userResolver } from './user';

export const resolvers = merge(
  orderResolver,
  productResolver,
  userResolver
);
