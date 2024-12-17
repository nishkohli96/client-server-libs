import { Response, Router } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import * as PersonTypes from './types';
import personService from './service';

const personRouter = Router();
const subRoutes = ExpressServerEndpoints.people.subRoutes;

/* GET: /people/list  */
personRouter.get(
  `/${subRoutes.list}`,
  async (req: PersonTypes.GetPersonsListRequest, res: Response) => {
    const queryParams = req.query;
    return personService.getPersonsList(res, queryParams);
  }
);

personRouter.post(
  `/${subRoutes.add}`,
  async (req: PersonTypes.AddPersonRequest, res: Response) => {
    const reqBody = req.body;
    return personService.addPerson(res, reqBody);
  }
);

export { personRouter };
