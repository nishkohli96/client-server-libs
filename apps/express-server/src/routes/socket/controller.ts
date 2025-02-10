import { Router, Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import socketService from './service';

const socketRouter = Router();
const subRoutes = ExpressServerEndpoints.socket.subRoutes;

socketRouter.get(
  `/${subRoutes.test}`,
  async function testConnection(_, res: Response) {
    return await socketService.testConnection(res);
  }
);

export { socketRouter };
