import { Router, type Response, type Request } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import type * as UserTypes from './types';
import userService from './service';

const userRouter = Router();
const subRoutes = ExpressServerEndpoints.user.subRoutes;

/* POST /user/add */
userRouter.post(
  `/${subRoutes.add}`,
  async(req: UserTypes.AddUserRequest, res: Response) => {
    return await userService.createUser(res, req.body);
  }
);

/* GET /user/list */
userRouter.get(
  `/${subRoutes.list}`,
  async(req: Request, res: Response) => {
    return await userService.getActiveUsers(res);
  }
);

/* GET /user/list-inactive */
userRouter.get(
  `/${subRoutes.listInactive}`,
  async(req: Request, res: Response) => {
    return await userService.getInactiveUsers(res);
  }
);

export { userRouter };
