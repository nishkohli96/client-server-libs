import { Router } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import { stripeCustomerRouter } from './customers/controller';
import { stripePricesRouter } from './prices/controller';
import { stripeProductRouter } from './products/controller';

const stripeRouter = Router();
const subRoutes = ExpressServerEndpoints.stripe.subRoutes;

stripeRouter.use(subRoutes.customers.rootPath, stripeCustomerRouter);
stripeRouter.use(subRoutes.prices.rootPath, stripePricesRouter);
stripeRouter.use(subRoutes.products.rootPath, stripeProductRouter);

export { stripeRouter };
