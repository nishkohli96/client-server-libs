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
    return await personService.getPersonsList(res, queryParams);
  }
);

/* POST: /people/add */
personRouter.post(
  `/${subRoutes.add}`,
  async (req: PersonTypes.AddPersonRequest, res: Response) => {
    const reqBody = req.body;
    return await personService.addPerson(res, reqBody);
  }
);

/* PUT: /people/update/{_id} */
personRouter.put(
  `/${subRoutes.update}/:_id`,
  async (req: PersonTypes.EditPersonRequest, res: Response) => {
    const personId = req.params._id;
    const reqBody = req.body;
    return await personService.updatePersonDetails(res, personId, reqBody);
  }
);

/* DELETE: /people/delete/{_id} */
personRouter.delete(
  `/${subRoutes.delete}/:_id`,
  async (req: PersonTypes.DeletePersonRequest, res: Response) => {
    const personId = req.params._id;
    return await personService.deletePerson(res, personId);
  }
);

export { personRouter };
