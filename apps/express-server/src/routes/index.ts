import { ExpressServerEndpoints } from '@csl/react-express';
import { fileRouter } from './file/controller';
import { personRouter } from './person/controller';
import { stytchRouter } from './stytch/controller';

export const routesArray = [
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
  }
];