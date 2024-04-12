import axios from 'axios';
import { ApiEndpoints, ENV_VARS } from 'app-constants';

const datoCMSApi = axios.create({
  baseURL: ApiEndpoints.datoCMS,
  headers: { Authorization: `Bearer ${ENV_VARS.dataCMS_apiKey}` },
});

datoCMSApi.interceptors.response.use(
  function transformResponse(response) {
    if (
      (response.status >= 200 && response.status < 300)
      || response.status === 304
    ) {
      return response.data;
    }
  },
  function throwError(error) {
    return error;
  },
);

export { datoCMSApi };
