import { type Router } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import { awsRouter } from './aws/controller';
import { buyerRouter } from './buyer/controller';
import { carRouter } from './car/controller';
import { carBrandRouter } from './car-brand/controller';
import { fileRouter } from './file/controller';
import { personRouter } from './person/controller';
import { socketRouter } from './socket/controller';
import { stripeRouter } from './stripe';
import { stytchRouter } from './stytch/controller';
import { userRouter } from './user/controller';

type RouteInfo = {
  rootPath: string;
  router: Router;
};

export const routesArray: RouteInfo[] = [
  {
    rootPath: ExpressServerEndpoints.aws.rootPath,
    router: awsRouter
  },
  {
    rootPath: ExpressServerEndpoints.buyer.rootPath,
    router: buyerRouter
  },
  {
    rootPath: ExpressServerEndpoints.car.rootPath,
    router: carRouter
  },
  {
    rootPath: ExpressServerEndpoints.carBrand.rootPath,
    router: carBrandRouter
  },
  {
    rootPath: ExpressServerEndpoints.files.rootPath,
    router: fileRouter
  },
  {
    rootPath: ExpressServerEndpoints.people.rootPath,
    router: personRouter
  },
  {
    rootPath: ExpressServerEndpoints.socket.rootPath,
    router: socketRouter
  },
  {
    rootPath: ExpressServerEndpoints.stripe.rootPath,
    router: stripeRouter
  },
  {
    rootPath: ExpressServerEndpoints.stytch.rootPath,
    router: stytchRouter
  },
  {
    rootPath: ExpressServerEndpoints.user.rootPath,
    router: userRouter
  }
];
