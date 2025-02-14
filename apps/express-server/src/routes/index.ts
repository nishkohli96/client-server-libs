import { Router } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import { buyerRouter } from './buyer/controller';
import { carRouter } from './car/controller';
import { carBrandRouter } from './car-brand/controller';
import { fileRouter } from './file/controller';
import { personRouter } from './person/controller';
import { socketRouter } from './socket/controller';
import { stytchRouter } from './stytch/controller';
import { userRouter } from './user/controller';

type RouteInfo = {
  rootPath: string;
  router: Router;
}

export const routesArray: RouteInfo[] = [
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
    rootPath: ExpressServerEndpoints.stytch.rootPath,
    router: stytchRouter
  },
  {
    rootPath: ExpressServerEndpoints.user.rootPath,
    router: userRouter
  }
];
