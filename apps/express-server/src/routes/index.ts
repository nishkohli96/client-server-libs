import { ExpressServerEndpoints } from '@csl/react-express';
import { carRouter } from './car/controller';
import { carBrandRouter } from './car-brand/controller';
import { fileRouter } from './file/controller';
import { personRouter } from './person/controller';
import { stytchRouter } from './stytch/controller';

export const routesArray = [
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
    rootPath: ExpressServerEndpoints.stytch.rootPath,
    router: stytchRouter
  },
];
