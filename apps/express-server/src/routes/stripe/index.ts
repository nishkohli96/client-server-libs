import type express from 'express';
import { Router } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import { stripeCheckoutRouter } from './checkout/controller';
import { stripeCustomersRouter } from './customers/controller';
import { stripeFilesRouter } from './files/controller';
import { stripePaymentsRouter } from './payments/controller';
import { stripePricesRouter } from './prices/controller';
import { stripeProductsRouter } from './products/controller';

const stripeRouter: express.Router = Router();
const subRoutes = ExpressServerEndpoints.stripe.subRoutes;

stripeRouter.use(subRoutes.checkout.rootPath, stripeCheckoutRouter);
stripeRouter.use(subRoutes.customers.rootPath, stripeCustomersRouter);
stripeRouter.use(subRoutes.files.rootPath, stripeFilesRouter);
stripeRouter.use(subRoutes.payments.rootPath, stripePaymentsRouter);
stripeRouter.use(subRoutes.prices.rootPath, stripePricesRouter);
stripeRouter.use(subRoutes.products.rootPath, stripeProductsRouter);

export { stripeRouter };
