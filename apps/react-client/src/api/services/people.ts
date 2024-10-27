import { serverApi } from 'api/server';
import { ExpressServerEndpoints } from '@csl/react-express';
import { ServerResponse, PersonListApiData } from 'types';

const rootPath = ExpressServerEndpoints.people.rootPath;
const subRoutes = ExpressServerEndpoints.people.subRoutes;

export async function fetchPeopleList() {
  const response = await serverApi.get<ServerResponse<PersonListApiData>>(
    `${rootPath}/${subRoutes.list}`
  );
  return response.data.data;
}
