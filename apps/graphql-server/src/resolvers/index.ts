import { merge } from 'lodash';
import { categoryResolver } from './category';
import { orderResolver } from './order';
import { productResolver } from './product';
import { userResolver } from './user';

export const resolvers = merge(
  categoryResolver,
  orderResolver,
  productResolver,
  userResolver
);
