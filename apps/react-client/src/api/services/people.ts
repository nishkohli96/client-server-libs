import { serverApi } from 'api/server';
import { toast } from 'react-toastify';
import { ExpressServerEndpoints } from '@csl/react-express';
import { RequestQueryParams, ServerResponse, PersonListApiData } from 'types';
import { generateQueryString } from 'utils';

const rootPath = ExpressServerEndpoints.people.rootPath;
const subRoutes = ExpressServerEndpoints.people.subRoutes;

export async function fetchPeopleList(params: RequestQueryParams) {
  const queryString = generateQueryString(params);
  const response = await serverApi.get<ServerResponse<PersonListApiData>>(
    `${rootPath}/${subRoutes.list}?${queryString}`
  );

  // Check if the response status is 200
  if (response.status === 200) {
    return response.data.data;
  } else {
    // Handle non-200 response status
    toast.error(`Error: ${response.status} - Unable to fetch data.`);
    throw new Error(`Error: ${response.status}`);
  }
}
