import { serverApi } from 'api/server';
import { toast } from 'react-toastify';
import {
  type Person,
  type NewPerson,
  type PersonInfo
} from '@csl/mongo-models';
import { ExpressServerEndpoints } from '@csl/react-express';
import {
  type RequestQueryParams,
  type ServerResponse,
  type PersonListApiData
} from 'types';
import {
  generateQueryString,
  isValidResponseCode,
  handleApiError
} from 'utils';

const rootPath = ExpressServerEndpoints.people.rootPath;
const subRoutes = ExpressServerEndpoints.people.subRoutes;

const fallbackData = {
  nbPages: 0,
  nbRecords: 0,
  records: [],
  recordsPerPage: 0
};

export async function fetchPeopleList(params: RequestQueryParams) {
  try {
    const queryString = generateQueryString(params);
    const response = await serverApi.get<ServerResponse<PersonListApiData>>(
      `${rootPath}/${subRoutes.list}?${queryString}`
    );
    if (isValidResponseCode(response.status)) {
      return response.data.data;
    }

    toast.error(`Error: ${response.status} - Unable to fetch data.`);
    return fallbackData;
  } catch (error) {
    handleApiError(error);
    return fallbackData;
  }
}

export async function createPerson(body: NewPerson): Promise<boolean> {
  try {
    const response = await serverApi.post<ServerResponse<Person>>(
      `${rootPath}/${subRoutes.add}`,
      body
    );
    if (isValidResponseCode(response.status)) {
      return response.data.success;
    }

    toast.error(`Error: ${response.status} - Unable to add person.`);
    return false;
  } catch (error) {
    handleApiError(error);
    return false;
  }
}

export async function editPersonDetails(
  id: string,
  body: PersonInfo
): Promise<boolean> {
  try {
    const response = await serverApi.put<ServerResponse<Person>>(
      `${rootPath}/${subRoutes.update}/${id}`,
      body
    );
    if (isValidResponseCode(response.status)) {
      return response.data.success;
    }

    toast.error(`Error: ${response.status} - Unable to edit person details.`);
    return false;
  } catch (error) {
    handleApiError(error);
    return false;
  }
}

export async function deletePerson(id: string): Promise<boolean> {
  try {
    const response = await serverApi.delete<ServerResponse<Person>>(
      `${rootPath}/${subRoutes.delete}/${id}`
    );
    if (isValidResponseCode(response.status)) {
      return response.data.success;
    }

    toast.error(`Error: ${response.status} - Unable to delete person details.`);
    return false;
  } catch (error) {
    handleApiError(error);
    return false;
  }
}
