import { Request, Response, Router } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import { GetPersonsListRequest } from './types';
import personService from './service';

const personRouter = Router();
const subRoutes = ExpressServerEndpoints.people.subRoutes;

/* GET: /people/list  */
personRouter.get(`/${subRoutes.list}`, async(req: GetPersonsListRequest, res: Response) => {
  const queryParams = req.query;
  return personService.getPersonsList(res, queryParams);
});
