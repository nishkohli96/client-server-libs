import { Router } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import { stripeProductRouter } from './products/controller';

const stripeRouter = Router();
const subRoutes = ExpressServerEndpoints.stripe.subRoutes;

stripeRouter.use(subRoutes.products.rootPath, stripeProductRouter);

export { stripeRouter };
