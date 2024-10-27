import { serverApi } from 'api/server';
import { ExpressServerEndpoints } from '@csl/react-express';
import { RequestQueryParams, ServerResponse, PersonListApiData } from 'types';
import { generateQueryString } from 'utils';

const rootPath = ExpressServerEndpoints.people.rootPath;
const subRoutes = ExpressServerEndpoints.people.subRoutes;

export async function fetchPeopleList(params: RequestQueryParams) {
  const queryString = generateQueryString(params);
  console.log('queryString: ', queryString);
  const response = await serverApi.get<ServerResponse<PersonListApiData>>(
    `${rootPath}/${subRoutes.list}?${queryString}`
  );
  return response.data.data;
}
